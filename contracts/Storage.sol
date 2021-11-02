//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract Storage is AccessControl {
    string private publicStorage;

    bytes32 public constant SETTER_ROLE = keccak256("SETTER_ROLE");

    constructor(string memory _publicStorage) {
        console.log("Deploying a Storage contract");
        publicStorage = _publicStorage;
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function get_publicStorage() public view returns (string memory) {
        return publicStorage;
    }

    function set_publicStorage_public(string memory _publicStorage) public {
        console.log("Changing publicStorage from '%s' to '%s'", publicStorage, _publicStorage);
        publicStorage = _publicStorage;
    }

    function set_publicStorage_onlySETTER(string memory _publicStorage) public onlyRole(SETTER_ROLE) {
        console.log("Changing publicStorage by SETTER_ROLE from '%s' to '%s'", publicStorage, _publicStorage);
        publicStorage = _publicStorage;
    }
}
