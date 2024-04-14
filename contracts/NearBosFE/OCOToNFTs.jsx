const sender = Ethers.send("eth_requestAccounts", [])[0];
const contractAddress = "0xe4531Ad329830F47F8982110A3F89aE425a7c21E";
const productName = props.productName
  ? props.productName.split("(")[0]
  : "No Product";
const [isLoading, setIsLoading] = useState(false);
const [transactionHash, setTransactionHash] = useState(null);
const message = props.message || `Balance: `;
const unit = props.unit || `TEST`;
const [showModal, setShowModal] = useState(false);
const [canClose, setCanClose] = useState(false);
const [chainId, setChainID] = useState(false);

const [data, setData] = useState([
  {
    id: 1,
    name: "My House",
    publicData: "Registry ID 3182",
    privateData: "Address: Carrer Santander 3, 3-2. 08020 Barcelona",
  },
  {
    id: 2,
    name: "My Work",
    publicData: "Registry ID 2563",
    privateData: "Address: Carrer Arago 101, 2-2. 08015 Barcelona",
  },
  //{ id: 3, name: "Item 3", publicData: "Public 3", privateData: "Private 2" },
]);

const [whitelist, setWhitelist] = useState([
  {
    id: 1,
    dataId: 1,
    address: "0x9567D433240681653fb4DD3E05e08D60fe54210d",
    dateTime: "2024/04/15 12:00:00",
    active: 1,
  },
  {
    id: 1,
    dataId: 1,
    address: "0x00f02f3a111D452C0DFbF576f09A4003b2F18284",
    dateTime: "2024/04/25 12:00:00",
    active: 0,
  },
  //{ id: 3, name: "Item 3", publicData: "Public 3", privateData: "Private 2" },
]);

const web3ProviderInitialState = {
  isMetamaskInstalled: undefined,
  isDevelopment,
  // The info of the token (i.e. It's Name and symbol)
  swagData: undefined,
  // The user's address and balance
  selectedAddress: undefined,
  swag: undefined,
  // The ID about transactions being sent, and any possible error with them
  txBeingSent: undefined,
  transactionError: undefined,
  networkError: undefined,
  contractAddressToken: contractAddress.Token,
  claimSwagLoading: false,
};

const abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "initialOwner",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "ERC721IncorrectOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ERC721InsufficientApproval",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "approver",
        type: "address",
      },
    ],
    name: "ERC721InvalidApprover",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "ERC721InvalidOperator",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "ERC721InvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
    ],
    name: "ERC721InvalidReceiver",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "ERC721InvalidSender",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ERC721NonexistentToken",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeMint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

Ethers.provider()
  .getNetwork()
  .then((chainIdData) => {
    setChainID(chainIdData.chainId);
  });

const getTokenBalance = (receiver) => {
  const iface = new ethers.utils.Interface(abi);
  const encodedData2 = iface.encodeFunctionData("balanceOf", [
    "0x9567D433240681653fb4DD3E05e08D60fe54210d",
  ]);
  const provider3 = new Ethers.provider(window.ethereum);

  const contract = new Ethers.provider()
    .call({
      to: contractAddress,
      data: encodedData2,
    })
    .then((rawBalance) => {
      console.log(rawBalance);
    });
};

useEffect(() => {
  // This code runs after the component is mounted
  console.log("Component mounted");
  getTokenBalance();
  return () => {
    console.log("Component unmounted");
  };
}, []);

const handleSend = async () => {
  const value = 0.1 * 1000000000000000000;
  console.log("Sending", value, "wei to", contractAddress);
  const valueString = value.toString(16);
  console.log("valueString", valueString);

  try {
    const donation = Ethers.send("eth_sendTransaction", [
      {
        from: sender,
        to: contractAddress,
        value: valueString,
      },
    ]);

    setShowModal(true);

    let checkInterval = setInterval(() => {
      console.log("Checking transactionHash", donation);
      if (donation !== null) {
        setTransactionHash(donation);
        console.log("transactionHash is " + donation);
        setShowModal(false);
        clearInterval(checkInterval);
      }
    }, 3000);
  } catch (error) {
    console.error("Error:", error);
  }
};

function Modal({ onClose, show, children }) {
  if (!show) {
    return <></>;
  }

  return (
    <div
      class="modal-backdrop"
      style={{
        position: "fixed",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "rgba(224,224,224,0.3)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        zIndex: 2,
      }}
      onClick={() => {
        onClose();
      }}
    >
      <div
        class="rounded-2xl px-4 py-4"
        style={{
          width: "40%",
          minHeight: "80px",
          padding: "20px",
          color: "#0047AB",
          backgroundColor: "rgba(224,224,224)",
          //borderRadius: '0.45rem',
          //border: '3px solid #66CC99',
          alignItems: "center",
        }}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div class="rounded-lg bg-lime-300 py-4 px-4 border-0">{children}</div>
      </div>
    </div>
  );
}

useEffect(() => {
  setTransactionHash(props.transactionHashes);
}, [props.transactionHashes]);

const [dots, setDots] = useState("");

useEffect(() => {
  const intervalId = setInterval(() => {
    setDots((prevDots) => (prevDots.length < 3 ? prevDots + "." : ""));
  }, 700);
  return () => clearInterval(intervalId);
}, []);

const closeModal = () => {
  setShowModal(false);
};

const prettyAddress = (address) => {
  const string =
    address.substring(0, 2) +
    "..." +
    address.substring(address.length - 4, address.length);
  return string;
};

if (state.balance === undefined && sender) {
  Ethers.provider()
    .getBalance(sender)
    .then((balance) => {
      State.update({ balance: Big(balance).div(Big(10).pow(18)).toFixed(2) });
    });
}

if (!state.theme) {
  State.update({
    theme: styled.div`
    font-family: Manrope, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    font-weight: bold;
    background-color: #FFFFFF;
    color: #0047AB;
    padding: 5px;
    border-radius: 0.45rem;
  `,
  });
}
const Theme = state.theme;

const Navbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  color: white;
  background-color: #0600e1;
  
  h1 {
    margin-top: 7px;
    margin-left: 5px;
    font-size: 40px;
    font-weight: bold;
  }

  div {
    display: flex;
    align-items: center;
  }
`;

const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const RightSide = styled.div`
  display: flex;
  background-color: #FFFFFF;
  gap: 10px;
  border-radius: 0.45rem;
  border: 2px solid #007bff;
`;

const Footer = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
`;

return (
  <Theme>
    <div class="main-container">
      <Navbar>
        <div>
          <img
            src="https://docs.oasis.io/img/logo.png"
            alt="OCTOONFT Banner"
            height="40"
            width="40"
          />
          <h1>OCTO oNFT </h1>
        </div>
      </Navbar>
      <div class="header">
        <Navbar>
          <LeftSide>
            <div>
              {sender ? <>{prettyAddress(sender)}</> : ""} -
              {(chainId = 23295 ? "Sapphire Testnet" : "")} -{message}{" "}
              {state.balance} {unit}
            </div>
          </LeftSide>
          <RightSide>
            <Web3Connect
              className="styled.div"
              connectLabel="Connect"
              disconnectLabel="Disconnect"
              connectingLabel="Connecting..."
            />
          </RightSide>
        </Navbar>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div>
          <h1>My list of NFT's</h1>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              padding: "5px",
            }}
          >
            {data.map((item) => (
            <div>
              <div
                key={item.id}
                style={{
                  border: "1px solid black",
                  borderRadius: "0.45rem",
                  padding: "5px",
                }}
              >
                <h2>{item.name}</h2>
                <p>{item.publicData}</p>
                <p style={{ fontStyle: "italic" }}>{item.privateData}</p>

                <div style={{ padding: "5px" }}>
                  <input
                    type="text"
                    value={text}
                    placeholder="Whitelist address"
                    onChange={handleChange}
                  />
                </div>
                <div style={{ padding: "5px" }}>
                  <input type="date" value={date} onChange={handleDateChange} />
                  <input type="time" value={time} onChange={handleTimeChange} />
                </div>
                <button type="submit" variant="primary">
                  Whitelist
                </button>
              </div>
              {whitelist && (
          <div>
            <h3>Whitelisted Addresses</h3>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                //justifyContent: "left",
                alignItems: "center",
                gap: "10px",
                padding: "5px",
              }}
            >
              {whitelist.map((white) => (
        <div>
             {white.id == item.id ? (

                <div
                  key={white.id}
                  style={{
                    border: "1px solid black",
                    borderRadius: "0.45rem",
                    padding: "5px",
                  }}
                >
                  <h2>{white.name}</h2>
                  <p>{prettyAddress(white.address)}</p>
                  <p>{white.dateTime}</p>
                  {white.active ? (
                 <button type="submit" variant="primary">
                    Revoke
                  </button>
                  ) : (
                    <div>Time ended</div>
                  )
                  }
                </div>
          ) : (
                <div
                  key={white.id}
                  style={{
                    border: "1px solid white",
                    borderRadius: "0.45rem",
                    padding: "5px",
                  }}
                >
                  <h2></h2>
                  <p>&nbsp;</p>
                  <p>&nbsp;</p>
                  
                    <div>&nbsp;</div>
                </div>
          )}
          </div>
              ))}
            </div>
          </div>
              
        )}
            </div>
            ))}
          </div>
        </div>
        
      </div>
    </div>
    <Footer>
      <a href="https://near.social/mob.near/widget/MyPage?accountId=devgovgigs.near">
        <img
          src="https://i.ibb.co/BcD8HT2/powered-by-DH-dark.png"
          alt="Banner"
          target="_blank"
        />
      </a>
      <br></br>
      <br></br>
      <br></br>
    </Footer>
  </Theme>
);
