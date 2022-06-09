// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "./PriceConverter.sol";

error FundMe__NotOwner();

/** @title A contract for crowd funding
 *   @author Vitor Marthendal
 *   @notice This contract is to demo a sample funding contract
 *   @dev This implements price feeds as our library
 */
contract FundMe {
  // Type Declarations
  using PriceConverter for uint256;

  // State Variables
  mapping(address => uint256) public addressToAmountFunded;
  address[] public funders;
  address public immutable owner;
  uint256 public constant MINIMUM_USD = 50 * 10**18;
  AggregatorV3Interface public priceFeed;

  // Modifiers
  modifier onlyOwner() {
    // require(msg.sender == owner);
    if (msg.sender != owner) revert FundMe__NotOwner();
    _;
  }

  // Functions
  constructor(address priceFeedAddress) {
    owner = msg.sender;
    priceFeed = AggregatorV3Interface(priceFeedAddress);
  }

  receive() external payable {
    fund();
  }

  fallback() external payable {
    fund();
  }

  function fund() public payable {
    require(
      msg.value.getConversionRate(priceFeed) >= MINIMUM_USD,
      "You need to spend more ETH!"
    );
    // require(PriceConverter.getConversionRate(msg.value) >= MINIMUM_USD, "You need to spend more ETH!");
    addressToAmountFunded[msg.sender] += msg.value;
    funders.push(msg.sender);
  }

  function withdraw() public payable onlyOwner {
    for (uint256 funderIndex = 0; funderIndex < funders.length; funderIndex++) {
      address funder = funders[funderIndex];
      addressToAmountFunded[funder] = 0;
    }
    funders = new address[](0);
    // payable(msg.sender).transfer(address(this).balance);
    (bool success, ) = payable(msg.sender).call{value: address(this).balance}(
      ""
    );
    // call vs delegatecall
    require(success, "Transfer failed");
  }
}
