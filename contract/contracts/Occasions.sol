// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract TixHub is ERC721 {

	address payable public owner;
	uint256 public totalSupply = 0;
	uint256 public totalOccasions = 0;

	event Withdrawn(address organizer, uint256 organizerAmount, uint256 ownerAmount);

	constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) payable {
		owner = payable(msg.sender);
	}

	modifier onlyOwner() {
		require(msg.sender == owner);
		_;
	}

	struct Occasion {
		uint256 id;
		address organizer;
		string  name;
		uint256 cost;
		uint256 ticketsLeft;
		uint256 maxTickets;
		uint256 ticketsPerUser;
		string  date;
		string  time;
		string  location;
		uint256 totalCollected;
	}

	mapping(uint256 => Occasion) occasions;
	mapping(uint256 => mapping(address => uint256)) public mintedTickets;
	mapping(address => uint256[]) private _ownedTokens;

	function createOccasion(
		address _organizer,
		string memory _name,
		uint256 _cost,
		uint256 _maxTickets,
		uint256 _ticketsPerUser,
		string memory _date,
		string memory _time,
		string memory _location
	) public onlyOwner {
		totalOccasions++;
		occasions[totalOccasions] = Occasion(
			totalOccasions,
			_organizer,
			_name,
			_cost,
			_maxTickets,
			_maxTickets,
			_ticketsPerUser,
			_date,
			_time,
			_location,
			0
		);
	}

	function mint(uint256 _id) public payable {
		require(_id != 0 && _id <= totalOccasions, "Invalid occasion ID");
		require(occasions[_id].ticketsLeft > 0, "No tickets left");
		require(mintedTickets[_id][msg.sender] < occasions[_id].ticketsPerUser, "Max tickets minted");
		require(msg.value >= occasions[_id].cost, "Insufficient ETH");

		totalSupply++;
		_safeMint(msg.sender, totalSupply);
		occasions[_id].ticketsLeft -= 1;
		occasions[_id].totalCollected += msg.value;

		mintedTickets[_id][msg.sender]++;
		_ownedTokens[msg.sender].push(totalSupply);
	}

	function withdrawFunds(uint256 _id) external {
		require(_id > 0 && _id <= totalOccasions, "Invalid occasion ID");
		Occasion memory occasion = occasions[_id];
		require(msg.sender == occasion.organizer, "Only the organizer can withdraw");
		require(occasion.totalCollected > 0, "No funds to withdraw");

		uint256 totalAmount = occasion.totalCollected;
		uint256 ownerShare = (totalAmount * 5) / 100;
		uint256 organizerShare = totalAmount - ownerShare;

		occasion.totalCollected = 0;
		payable(owner).transfer(ownerShare);
		payable(occasion.organizer).transfer(organizerShare);

		emit Withdrawn(occasion.organizer, organizerShare, ownerShare);
	}

	function getOccasion(uint256 _id) public view returns (Occasion memory) {
		return occasions[_id];
	}

	function getTokensOfUser(address user) public view returns (uint256[] memory) {
		return _ownedTokens[user];
	}
}
