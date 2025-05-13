let activeTab = 'send';

async function showTab(tab) {
  document.querySelectorAll('.tab-content').forEach(div => div.classList.add('hidden'));
  document.getElementById(tab).classList.remove('hidden');
  activeTab = tab;
}

async function sendTokens() {
  const to = document.getElementById("sendAddress").value;
  const amount = document.getElementById("sendAmount").value;

  if (window.ethereum && to && amount) {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const tx = await signer.sendTransaction({
        to,
        value: ethers.utils.parseEther(amount)
      });
      alert("Transaction Sent! Hash: " + tx.hash);
    } catch (err) {
      console.error(err);
      alert("Transaction failed");
    }
  } else {
    alert("Missing wallet, address, or amount");
  }
}

async function loadWalletAddress() {
  if (window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    document.getElementById("receiveAddress").textContent = address;
  }
}

window.onload = () => {
  showTab(activeTab);
  loadWalletAddress();
};
