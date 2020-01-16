# Ethereum-DeployLocalPrivateBlockchain

Implementación de un contrato inteligente en una red local privada Ethereum.

Este proyecto consta de dos partes. Por un lado, se monta una red local privada Ethereum. Por otro lado, se despliega un simple contrato inteligente en esa red creada.

Para la creación de la red blockchain se hará uso del cliente **geth**. Para instalarlo en ubuntu se lanza los siguientes comandos:
```
sudo apt-get install software-properties-common
sudo add-apt-repository -y ppa:ethereum/ethereum
sudo apt-get update
sudo apt-get install ethereum
```

Lo primero que haremos es crear un directorio llamado "Ethereum-DeployLocalPrivateBlockchain"

```
mkdir Ethereum-DeployLocalPrivateBlockchain
```

Dentro de ese directorio se crea un archivo json llamado "genesis.json". En este archivo se definira como se creará el primer bloque de la cadena.

```json
{
    "config": {
        "chainId": 15,
        "homesteadBlock": 0,
        "eip150Block": 0,
        "eip155Block": 0,
        "eip158Block": 0
    },
    "difficulty": "400000",
    "gasLimit": "2100000",
    "alloc": {
        "[Account #1 Address]": { "balance": "1000000000000000000" },
        "[Account #2 Address]": { "balance": "2000000000000000000" },
    }
}
```



