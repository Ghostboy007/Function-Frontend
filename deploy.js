async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const Assessment = await ethers.getContractFactory("Assessment");
  const assessment = await Assessment.deploy();
  console.log("Assessment contract deployed to:", assessment.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
