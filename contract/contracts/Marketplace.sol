// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./Occasions.sol";

contract Marketplace {
	TixHub public tixHub;

	struct Listing {
		address seller;
		uint256 price;
		bool isActive;
	}

	mapping(uint256 => Listing) public listings;

	event TicketListed(uint256 tokenId, address seller, uint256 price);
	event TicketPurchased(uint256 tokenId, address buyer, uint256 price);
	event TicketDelisted(uint256 tokenId, address seller);

	constructor(address _tixHubAddress) {
		tixHub = TixHub(_tixHubAddress);
	}

	function listTicket(uint256 _tokenId, uint256 _price) external {
		require(_price > 0, "Price must be greater than zero");
		require(tixHub.getApproved(_tokenId) == address(this) ||
			tixHub.isApprovedForAll(msg.sender, address(this)), "Ticket must be approved for listing");
		require(tixHub.ownerOf(_tokenId) == msg.sender, "You do not own this ticket");
		require(!listings[_tokenId].isActive, "Ticket is already listed");

		listings[_tokenId] = Listing(msg.sender, _price, true);

		emit TicketListed(_tokenId, msg.sender, _price);
	}

	function buyTicket(uint256 tokenId) external payable {
		Listing memory listing = listings[tokenId];
		require(listing.isActive, "Ticket is not listed for sale");
		require(msg.value >= listing.price, "Insufficient payment");

		uint256 organizerShare = (listing.price * 5) / 100;
		uint256 sellerShare = listing.price - organizerShare;
		tixHub.safeTransferFrom(listing.seller, msg.sender, tokenId);
		payable(listing.seller).transfer(sellerShare);
		tixHub.getOccasion(tokenId).totalCollected += organizerShare;
		listings[tokenId].isActive = false;

		emit TicketPurchased(tokenId, msg.sender, listing.price);
}

	function delistTicket(uint256 tokenId) external {
		Listing memory listing = listings[tokenId];
		require(listing.isActive, "Ticket is not listed");
		require(listing.seller == msg.sender, "You are not the seller");

		listings[tokenId].isActive = false;

		emit TicketDelisted(tokenId, msg.sender);
	}
}
