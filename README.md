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

Dentro de ese directorio se creará tres directorios más llamados node1, node2 y node3.

```
mkdir node1 node2 node3
```

Cada una de estos directorios representará un nodo distinto en la cadena de bloques.


Dentro de ese directorio se crea también un archivo json llamado "genesis.json". En este archivo se definirá como se creará el primer bloque de la cadena.

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
    "gasLimit": "6721975",
    "alloc": {
        "[Account #1 Address]": { "balance": "1000000000000000000" },
        "[Account #2 Address]": { "balance": "2000000000000000000" }
    }
}
```

En *alloc* se especificará las direcciones de las cuentas que han sido creadas con un valor de ethers predefinido. Para crear estas cuentas se ejecuta el siguiente comando:

```
geth --datadir "/home/ivan/Desktop/Ethereum-DeployLocalPrivateBlockchain/node1" account new
```

Nos pedirá una contraseña. En este caso he usado para la primera cuenta la contraseña: node1. Una vez confirmada la contraseña nos aparece por pantalla la dirección pública de la clave:
```
0xC5C69293653892221434cfE650A18a6DB65aB241
```
Repetimos el procedimiento para añadir una segunda cuenta, por lo que volvemos a lanzar el último comando ejecutado. En este caso la contraseña de esta segunda cuenta será: node11 y la dirección pública de la clave generada es:
```
0xf18E3B8238F6523eBC3557C0aD100f64e5661c0B
```

Una vez que hemos creado las dos cuentas añadimos sus direcciones al archivo genesis.json en la sección *alloc*. El archivo genesis.json quedaría de la siguiente forma:
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
    "gasLimit": "6721975",
    "alloc": {
        "C5C69293653892221434cfE650A18a6DB65aB241": { "balance": "1000000000000000000" },
        "f18E3B8238F6523eBC3557C0aD100f64e5661c0B": { "balance": "2000000000000000000" }
    }
}
```

El siguiente paso es inicializar cada uno de los nodos. Para ello se usa el archivo genesis.json creado en el paso anterior.

```
geth --datadir "/home/ivan/Desktop/Ethereum-DeployLocalPrivateBlockchain/node1/" init /home/ivan/Desktop/Ethereum-DeployLocalPrivateBlockchain/genesis.json

geth --datadir "/home/ivan/Desktop/Ethereum-DeployLocalPrivateBlockchain/node2/" init /home/ivan/Desktop/Ethereum-DeployLocalPrivateBlockchain/genesis.json

geth --datadir "/home/ivan/Desktop/Ethereum-DeployLocalPrivateBlockchain/node3/" init /home/ivan/Desktop/Ethereum-DeployLocalPrivateBlockchain/genesis.json
```

A continuación, arrancamos los tres nodos para ello se ejecuta el siguiente comando para cada uno de ellos, cambiando el parámetro *identity*, *datadir*, *port* y *rpcport*. Ejecutaremos cada comando de arranque de cada nodo en terminales distintas.

```
geth --identity "node1" --rpc --rpcport "8001" --rpccorsdomain "*" --datadir "/home/ivan/Desktop/Ethereum-DeployLocalPrivateBlockchain/node1" --port "30301" --nodiscover --rpcapi "db,eth,net,web3,personal,miner,admin" --networkid 1900 --nat "any" --allow-insecure-unlock

geth --identity "node2" --rpc --rpcport "8002" --rpccorsdomain "*" --datadir "/home/ivan/Desktop/Ethereum-DeployLocalPrivateBlockchain/node2" --port "30302" --nodiscover --rpcapi "db,eth,net,web3,personal,miner,admin" --networkid 1900 --nat "any" --allow-insecure-unlock

geth --identity "node3" --rpc --rpcport "8003" --rpccorsdomain "*" --datadir "/home/ivan/Desktop/Ethereum-DeployLocalPrivateBlockchain/node3" --port "30303" --nodiscover --rpcapi "db,eth,net,web3,personal,miner,admin" --networkid 1900 --nat "any" --allow-insecure-unlock
```

Para interactuar con los nodos abrimos otro terminal y usamos el siguiente comando con el puerto correspondiente al nodo.

```
geth attach http://127.0.0.1:8001

geth attach http://127.0.0.1:8002

geth attach http://127.0.0.1:8003
```

Esto nos permite interactuar con los nodos a través de Javascript API web3.js

En este caso, el nodo administrador será el nodo1. Para ver la información del nodo lanzamos el siguiente comando desde la consola.

```
admin.nodeInfo
```
```json
{
  enode: "enode://e333d3e698c414d5cb9d33cb8eb7c8d04951b0395ce6af890bf5a261a479ed66e9a4afed13ccb4a7164424aa9db7ba2b43bdd42ed3a1cbe9af56f53bab515d34@127.0.0.1:30301?discport=0",
  enr: "enr:-JC4QBvgN6Nig5OJL5XKca1EI0X3m9xCTuQjtQc35HtZv8hReUNwwIcFgnchhTy7z-jsjLnc_tUzBZdAlgAyxTlIdhcBg2V0aMfGhMhYYEmAgmlkgnY0gmlwhH8AAAGJc2VjcDI1NmsxoQLjM9PmmMQU1cudM8uOt8jQSVGwOVzmr4kL9aJhpHntZoN0Y3CCdl0",
  id: "c00965d43c568b457f796c6b6dbd7721e9b2553ec27d5f33e039ec0cc60dad55",
  ip: "127.0.0.1",
  listenAddr: "[::]:30301",
  name: "Geth/node1/v1.9.9-stable-01744997/linux-amd64/go1.13.4",
  ports: {
    discovery: 0,
    listener: 30301
  },
  protocols: {
    eth: {
      config: {
        chainId: 15,
        eip150Block: 0,
        eip150Hash: "0x0000000000000000000000000000000000000000000000000000000000000000",
        eip155Block: 0,
        eip158Block: 0,
        homesteadBlock: 0
      },
      difficulty: 400000,
      genesis: "0x948d9b45b98b762920a8d29833657637c46d40eb9fdce6f52e34d3d1a0207cca",
      head: "0x948d9b45b98b762920a8d29833657637c46d40eb9fdce6f52e34d3d1a0207cca",
      network: 1900
    }
  }
}
```
La información que nos interesa es el *enode*.

```
 "enode://e333d3e698c414d5cb9d33cb8eb7c8d04951b0395ce6af890bf5a261a479ed66e9a4afed13ccb4a7164424aa9db7ba2b43bdd42ed3a1cbe9af56f53bab515d34@127.0.0.1:30301?discport=0"
```

Con esta dirección enode del nodo1 podemos conectar los otros nodos a este lanzando el siguiente comando en la consola del nodo2 y nodo3.

```
admin.addPeer("enode://e333d3e698c414d5cb9d33cb8eb7c8d04951b0395ce6af890bf5a261a479ed66e9a4afed13ccb4a7164424aa9db7ba2b43bdd42ed3a1cbe9af56f53bab515d34@127.0.0.1:30301?discport=0")
```

Para verificar que el nodo2 y nodo3 se han conectado al nodo1 se puede lanzar el siguiente comiendo.
```
net.peerCount
```

Si se ha lanzado el comando admin.addPeer("enode nodo 1"), en las consolas de node2 y node3, debería devolver un 2.

Para ver las cuentas que tenemos creadas y el balance de esas cuentas ejecutamos desde el nodo1 los siguientes comandos.

```
eth.accounts

eth.getBalance(eth.accounts[0])

eth.getBalance(eth.accounts[1])
```

Para poder realizar una transacción es necesario desbloquear la cuenta que va mandar ethers.

```
personal.unlockAccount(eth.accounts[0])
```

Para enviar ethers se lanza el siguiente comando.

```
eth.sendTransaction({from:eth.accounts[0], to:eth.accounts[1], value:1000})
```

Tras este comando, la transacción se ha debido crear con éxito. Lo siguiente que hay que hacer es iniciar un minero para que esta transacción se procese realmente y persista en la blockchain.

Lo primero que debe hacer es establecer una cuenta para recibir las recompensar por minar. Esto se llama la cuenta etherbase. Utilizaremos el nodo de administrador como minero. Vaya a la consola conectada a ella y ejecute el siguiente comando.

```
miner.setEtherbase(eth.accounts[0])
```

Luego inicia el minero.

```
miner.start()
```

Si ahora ejecutamos el comando para consultar el balance de las cuentas, se observa que el valor a cambiado.
