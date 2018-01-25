# Bitnation Nation Framework

## Interface for use

### Nations Contract
To deploy the nations contract, run `truffle migrate --network live` which will take care of 
setting up all of the proxy to implementation connections. To actually get an instance of the nations
contract, you need to fetch the instance of the proxy with the Nations wrapper. Do this with
`nationInstance = Nation.at(nationProxy.address)`
!Important Make sure you get the implementation this way, otherwise the nation will not be upgradable 
After you get the implementation, you can interact with it in the following ways:

#### Upgrading the nations contract
To upgrade the nations contract, make sure you are the current owner of the contract. You can check with a simple
`nationInstance.owner()`, since owner is a public state variable. You can change the owner of the contract with 
`nationInstance.changeOwner(address newOwner)` which will fire off a `OwnerChanged(address indexed newOwner)` event.
Note that this function can only be called from the current owner.

You can also check the current version with `nationInstance.NationCoreVersion()`.

To upgrade the nation, run `nationInstance.upgradeNation(address newNationContract)` with the address of the deployed
new nation contract. This will fire off a `UpgradeNation(address indexed newNation)` event

#### Creating and setting a nation's properties

Create a nation by passing in a serialized JSON object of it's properties:
`nationInstance.createNation('{nationMame: USA...}')`
This will fire off a `NationCreated(address indexed founder, uint indexed nationId)` event.
Keep track of the nation Id because that is what you will be using to interface with your nation from now on.

#### Getting a nation's properties  
You can get a nation's metadata by calling
`nationInstance.getNationMetaData(uint nationId)`, which will return the metadata of the specified nation                                                                                                                                                                                

You can also use assistant functions to get other data from nations:
`nationInstance.numNations()`, which returns the current number of nations that exist.
`nationInstance.getFoundedNations(address founder)`, which returns an array of nation ids that the founder has created.

#### Citizen management
Citizens can join or leave a nation with the following commands:
`nationInstance.joinNation(uint nationId)` and
`nationInstance.leaveNation(uint nationId)` which will fire off
`CitizenJoined(uint indexed nationId, address citizenAddress)` and `CitizenLeft(uint indexed nationId, address citizenAddress)` events respectively.


You can check if a citizen is a member of a nation with the constant function:
`nationInstance.checkCitizen(address citizenAddress, uint nationId)`

You can get the number of citizens in a nation with the constant function:
`nationInstance.getNumCitizens(uint nationId)`




### Token Registry
The token registry refers to nations in the nations contract with their nationId. Multiple tokens can be created
for the same nation, and can have the same name. The only truly unique identifier of any token is it's address. All generated
tokens are ERC20 compatible tokens. This contract is very simple in the sense that it only has two functions to interface with it.

You can create a token for a nation with:
`createStandardToken(uint nationId, uint initialAmount, string name, uint8 decimals, string symbol)` which will
create a ERC20 standard token and will emit a `TokenCreated(address tokenAddress, string tokenName, uint indexed nationId)` event.

You can get all of the tokens under a nation with the constant function:
`getTokensForNation(uint nationId)`
which will return an array of addresses

To interface with any of the tokens, you can just use the address as well as the NationStandardToken contract.
Token properties include: 

string public name;                   
uint public nationId;                 
uint8 public decimals;            
string public symbol;

which are all public variables so they can easily be accessed.

## Development

### Docker
1. Get docker
2. Run `docker-compose up` to start the container's
3. Run `docker-compose exec node bash` to enter the node env. DONT RUN ANY COMMAND FROM YOUR LOCAL ENV.
4. Run `exit` to exit from the node container's
5. Run `docker-compose stop` to turn shut down the container's. 
6. Run `docker-compose start` to start the container's
7. Run `docker-compose down` to destroy the container's.
8. Run `docker-compose build` to rebuild the images (you need this when you change thing's in the Dockerfile's)

### Testing
1. To run the tests, use `npm run test` inside the docker node env
2. To run coverage, use `npm run coverage` inside the docker node env

### Git 
- We are using [this](http://nvie.com/posts/a-successful-git-branching-model/) git workflow. Make sure you read it. 
- PLEASE prefix your git commit's with a topic like so: `[git] blacklisted .idea folder`
- Make SMALL commit's. It's then way better to follow your changes. 
