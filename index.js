web3 = new Web3("HTTP://127.0.0.1:8001"); 

//Change with your abi
abi = JSON.parse('[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"GetMyRegistries","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"Register","outputs":[],"stateMutability":"nonpayable","type":"function"}]');

//Get all account addresses
web3.eth.getAccounts().then(accounts => {
    accounts.forEach(account => {
        addAccount(account);
    });
});

//instance of contract
contractDeployed = new web3.eth.Contract(abi, '0x6fE8c2525017e1b5ef96071620A124D8E63024BB');
console.log('Contract address: ' + contractDeployed.options.address);


function addAccount(account) { 
    $('#select').append(`<option> 
                               ${account} 
                          </option>`); 
} 

function Register(){
    sender = $("#select").val();

    if(sender == "") return;

    contractDeployed.methods.Register().send({from: sender}, (err) => {
        if (err) {
            console.log(`error: ${err}`);
            return;
        }

        GetRegistries();
    });
}

function GetRegistries(){
    sender = $("#select").val();

    contractDeployed.methods.GetMyRegistries().call({ from: sender }, (err, data) => {
        if (err) {
            console.log(`error: ${err}`);
            return;
        }

        $("#registries").empty();

        for (i=0; i<data.length; i++){
            var fecha = new Date((data[i] * 1000));
            var options = { timeZone: 'Europe/Madrid' ,weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };

           

            $("#registries").append(`<li> ${fecha.toLocaleDateString("es-ES", options)}</li>`)
        }
    });
}

