// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract TixHub is ERC721 {

	address payable public owner;
	uint256 public totalOccasions = 0;

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
}
