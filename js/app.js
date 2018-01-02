new Vue({
	el: '#app',
	data: {
		playerHealth: 100,
		monsterHealth: 100,
		gameIsRunning: false,
		turns: []
	},
	methods: {
		startGame: function() {
			this.gameIsRunning = true;
			this.playerHealth = 100;
			this.monsterHealth = 100;
			this.turns = [];
		},
		attack: function() {
			var damage = this.calculateDamage(2, 10);
			this.monsterHealth -= damage;

			this.turns.unshift({
				isPlayer: true,
				text: "Player nails the Monster for " + damage
			});

			if (this.checkWin()) {
				return;
			}

			this.monsterAttacks();
		},
		specialAttack: function() {
			var damage = this.calculateDamage(2, 10);
			this.monsterHealth -= damage;

			this.turns.unshift({
				isPlayer: true,
				text: "Player nails the Monster in the noggen for " + damage
			});

			if (this.checkWin()) {
				return;
			}

			this.monsterAttacks();
		},
		heal: function() {
			if (this.playerHealth <= 90) {
				this.playerHealth += 10;
			} else {
				this.playerHealth = 100;
			}

			this.turns.unshift({
				isPlayer: true,
				text: "Player heals for 10"
			});

			this.monsterAttacks();
		},
		giveUp: function() {
			this.gameIsRunning = false;
		},
		monsterAttacks: function() {
			var damage = this.calculateDamage(5, 15);
		 	this.playerHealth -= damage;

		 	this.turns.unshift({
				isPlayer: false,
				text: "Monster bites the Player for " + damage
			});

			this.checkWin();
		},
		calculateDamage: function(min, max) {
			return Math.max(Math.floor(Math.random() * max) + 1, min);
		},
		checkWin: function() {
			if (this.monsterHealth <= 0) {
				if (confirm('You slayed the beast! New monster?')) {
					this.startGame();
				} else {
					this.gameIsRunning = false;
				}
				return true;
			} else if (this.playerHealth <= 0) {
				if (confirm('The beast ate your face! Reincarnate?')) {
					this.startGame();
				} else {
					this.gameIsRunning = false;
				}
				return true;
			}
		}
	}
});