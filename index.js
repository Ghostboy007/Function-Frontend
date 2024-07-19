import { useState, useEffect } from "react";
import { ethers } from "ethers";
import assessment_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";
import styles from "./styles.module.css";

export default function HomePage() {
  const bg = "https://picsum.photos/1920/1080";

  useEffect(() => {
    document.body.style.backgroundImage = `url('${bg}')`;
    document.body.style.backgroundSize = "cover";
    document.body.style.color = "white";
    document.body.style.fontFamily = "Arial, sans-serif";
    document.body.style.textAlign = "center";
    document.body.style.paddingTop = "50px";
  }, []);

  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [assessment, setAssessment] = useState(undefined);
  const [value, setValueState] = useState(0);
  const [message, setMessageState] = useState("Hello, world!");
  const [loadingValue, setLoadingValue] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(false);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; 
  const assessmentABI = assessment_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
      console.log("Ethereum wallet found");
    } else {
      console.log("No Ethereum wallet found");
    }

    if (ethWallet) {
      const accounts = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(accounts);
    }
  };

  const handleAccount = (accounts) => {
    if (accounts.length > 0) {
      console.log("Account connected: ", accounts[0]);
      setAccount(accounts[0]);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts);

    getAssessmentContract();
  };

  const getAssessmentContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const assessmentContract = new ethers.Contract(contractAddress, assessmentABI, signer);

    console.log("Assessment contract initialized:", assessmentContract);
    setAssessment(assessmentContract);
  };

  const fetchValue = async () => {
    if (assessment) {
      try {
        setLoadingValue(true);
        console.log("Fetching value...");
        const value = await assessment.getValue();
        setValueState(value.toNumber());
        console.log("Fetched value:", value.toNumber());
      } catch (error) {
        console.error("Error fetching value:", error);
      } finally {
        setLoadingValue(false);
      }
    }
  };

  const fetchMessage = async () => {
    if (assessment) {
      try {
        setLoadingMessage(true);
        console.log("Fetching message...");
        const message = await assessment.getMessage();
        setMessageState(message);
        console.log("Fetched message:", message);
      } catch (error) {
        console.error("Error fetching message:", error);
      } finally {
        setLoadingMessage(false);
      }
    }
  };

  const updateValue = async () => {
    if (assessment) {
      const newValue = prompt("Enter new value:");
      if (newValue) {
        try {
          const tx = await assessment.setValue(Number(newValue));
          await tx.wait();
          console.log("Value updated, fetching new value...");
          await fetchValue();
        } catch (error) {
          console.error("Error setting value:", error);
        }
      }
    }
  };

  const updateMessage = async () => {
    if (assessment) {
      const newMessage = prompt("Enter new message:");
      if (newMessage) {
        try {
          const tx = await assessment.setMessage(newMessage);
          await tx.wait();
          console.log("Message updated, fetching new message...");
          await fetchMessage();
        } catch (error) {
          console.error("Error setting message:", error);
        }
      }
    }
  };

  const initUser = () => {
    if (!ethWallet) {
      return <p>Please install MetaMask in order to use this application.</p>;
    }

    if (!account) {
      return <button className={styles.btn} onClick={connectAccount}>Please connect your MetaMask wallet</button>;
    }

    return (
      <div className={styles.card}>
        <p><strong>Your Account:</strong> {account}</p>
        <p><strong>Stored Value:</strong> {loadingValue ? "Loading..." : value !== undefined ? value : "Not available"}</p>
        <button className={styles.btn} onClick={updateValue}>Update Value</button>
        <p><strong>Stored Message:</strong> {loadingMessage ? "Loading..." : message !== undefined ? message : "Not available"}</p>
        <button className={styles.btn} onClick={updateMessage}>Update Message</button>
      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  useEffect(() => {
    if (account && assessment) {
      console.log("Fetching initial values...");
      fetchValue();
      fetchMessage();
    }
  }, [account, assessment]);

  return (
    <main className={styles.container}>
      <header><h1>Welcome to the Metcrafters App!</h1></header>
      {initUser()}
    </main>
  );
}


