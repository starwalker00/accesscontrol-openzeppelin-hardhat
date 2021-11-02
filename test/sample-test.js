const { expect } = require("chai");
const { deployments, getNamedAccounts, ethers } = require("hardhat");

describe("Storage", function () {
  // let deployer
  // let setter;
  // beforeEach(async () => {
  //   const {deployer, setter} = await getNamedAccounts();
  // });
  // let storage;
  // beforeEach(async () => {
  //   const Storage = await ethers.getContractFactory("Storage");
  //   const storage = await Storage.deploy("first");
  //   await storage.deployed();
  // });
  it("Should return the new storage once it's changed", async function () {
    const Storage = await ethers.getContractFactory("Storage");
    const storage = await Storage.deploy("first");
    await storage.deployed();

    expect(await storage.get_publicStorage()).to.equal("first");

    const tx = await storage.set_publicStorage_public("second");

    // wait until the transaction is mined
    await tx.wait();

    expect(await storage.get_publicStorage()).to.equal("second");
  });
  it("Should properly handle SETTER_ROLE", async function () {
    const Storage = await ethers.getContractFactory("Storage");
    const storage = await Storage.deploy("first");
    await storage.deployed();

    const {deployer, setter} = await getNamedAccounts();
    const DEFAULT_ADMIN_ROLE = await storage.DEFAULT_ADMIN_ROLE();
    const SETTER_ROLE = await storage.SETTER_ROLE();
    console.log(SETTER_ROLE)
    console.log(DEFAULT_ADMIN_ROLE)

    console.log(deployer)
    expect(await storage.hasRole(DEFAULT_ADMIN_ROLE, deployer)).to.equal(true);
    expect(await storage.hasRole(SETTER_ROLE, deployer)).to.equal(false);

    await storage.grantRole(SETTER_ROLE, setter);

    console.log(setter)
    expect(await storage.hasRole(DEFAULT_ADMIN_ROLE, setter)).to.equal(false);
    expect(await storage.hasRole(SETTER_ROLE, setter)).to.equal(true);

    // await expect(storage.set_publicStorage_onlySETTER("second",{from: deployer})).to.be.reverted;
    // await expect(storage.set_publicStorage_onlySETTER("second",{from: setter})).to.be.reverted;
  });
});
