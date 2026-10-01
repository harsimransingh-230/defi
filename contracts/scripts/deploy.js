// // const hre = require("hardhat");
// // async function main() {
// //   const Token = await hre.ethers.getContractFactory("MockToken");
// //   const token = await Token.deploy(); await token.waitForDeployment();
// //   const tokenAddress = await token.getAddress();
// //   const LendingPool = await hre.ethers.getContractFactory("LendingPool");
// //   const pool = await LendingPool.deploy(tokenAddress); await pool.waitForDeployment();
// //   const poolAddress = await pool.getAddress();
// //   console.log("TOKEN_ADDRESS=", tokenAddress);
// //   console.log("LENDING_POOL_ADDRESS=", poolAddress);
// // }
// // main().catch((error) => { console.error(error); process.exitCode = 1; });


// import hre from "hardhat";

// async function main() {

//     console.log("Starting deployment...");

//     const Token =
//         await hre.ethers.getContractFactory(
//             "MockToken"
//         );

//     const token =
//         await Token.deploy();

//     await token.waitForDeployment();

//     const tokenAddress =
//         await token.getAddress();

//     console.log(
//         "MockToken:",
//         tokenAddress
//     );


//     const LendingPool =
//         await hre.ethers.getContractFactory(
//             "LendingPool"
//         );

//     const pool =
//         await LendingPool.deploy(
//             tokenAddress
//         );

//     await pool.waitForDeployment();

//     const poolAddress =
//         await pool.getAddress();

//     console.log(
//         "LendingPool:",
//         poolAddress
//     );


//     console.log("");
//     console.log(
//         "TOKEN_ADDRESS=",
//         tokenAddress
//     );

//     console.log(
//         "LENDING_POOL_ADDRESS=",
//         poolAddress
//     );
// }

// main().catch(
//     (error) => {

//         console.error(error);

//         process.exitCode = 1;
//     }
// );


const hre = require("hardhat");

async function main() {
    console.log("Starting deployment...");

    const Token =
        await hre.ethers.getContractFactory("MockToken");

    const token =
        await Token.deploy();

    await token.deployed();

    const tokenAddress = token.address;

    console.log(
        "MockToken:",
        tokenAddress
    );

    const LendingPool =
        await hre.ethers.getContractFactory(
            "LendingPool"
        );

    const pool =
        await LendingPool.deploy(
            tokenAddress
        );

    await pool.deployed();

    const poolAddress = pool.address;

    console.log(
        "LendingPool:",
        poolAddress
    );

    console.log(
        "\nTOKEN_ADDRESS=",
        tokenAddress
    );

    console.log(
        "LENDING_POOL_ADDRESS=",
        poolAddress
    );
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});