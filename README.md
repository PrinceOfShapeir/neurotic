# neurotic
Solves Puzzles and Games using Synaptic.js neural framework. 

To run, do npm install synaptic --save.
The files should run as is in the terminal, e.g. "node e.js"

A playable version of the tic tac toe AI is live at https://battletoes.firebaseapp.com/

Feel free to comment any unexpected results!

tictact2generator.js is where the main action is these days. In  it, multiple versions of the network face off in a Battle Royale from which only one remains. After each complete victory, the losing player is sent to the Shadow Realm, but its sacrifice allows subsequent players to learn from its mistakes. The winning player strengthens its affinity towards the winning play. In practice this leads to personality, as the values snowball playerOne tends to prefer strategies that have worked for it in the past. Player Twos have no such affinity. This leads to directed exploration of specific strategies, which are ultimately overcome by the cooperation across generations by player Twos. Every time a playerTwo wins, succession occurs, the old playerOne is purged and the new player One has the genetic memory of past lives as player Two, now it experiences magnified positive reinforcement, until it too falls into decadence and is replaced...


Current notes: The generator only backpropagates a turn, but in theory games states themselves should back propagate as both players learn to minimize wasted moves, until it reaches equilibrium, so we don't need to waste time backpropagating the entire game! 
