<template>
  <v-app>
    <v-app-bar app dark color="blue-grey darken-1">
      <h2 class="d-flex display-1">Analisador Léxico</h2>
      <v-spacer></v-spacer>
      <HeaderButtons />
    </v-app-bar>
    <v-content>
      <v-overlay :absolute="true" :value="overlay" opacity="0.7">
        <h1 class="display-4">LexicalAnalyzer HELP!</h1>
      </v-overlay>
      <v-container fluid>
        <v-row>
          <v-col cols="12">
            <TokenCard :tokens="tokens" :attempts="attempts" :tokenMaxLength="tokenMaxLength"
              @tokenAdded="addToken" @tokenDeleted="deleteToken" />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <StateTable :automaton="automaton" :tokenMaxLength="tokenMaxLength" />
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import HeaderButtons from "@/components/layout/HeaderButtons";
import TokenCard from "./components/TokenCard";
import StateTable from "./components/StateTable";

export default {
  name: 'App',

  components: {
    HeaderButtons, StateTable, TokenCard
  },

  data: () => ({
    overlay: false,
    tokenMaxLength: 30,
    tokens: [],
    automaton: [],
    attempts: []
  }),

  methods: {
    addToken(newToken) {
      this.tokens.push(newToken);
    },
    deleteToken(i) {
      this.tokens.splice(i, 1);
    },
    _buildAutomaton() {
      const alphabet = this._getAlphabet();
      const rows = this._getRows(alphabet);
      window.console.log(alphabet, rows);
    },
    _getAlphabet() {
      let alphabet = [];
      this.tokens.map(token => {
        const tokenLetters = token.split("");
        const uniqueLetters = tokenLetters.filter((char, i, arr) => arr.indexOf(char) == i);
        uniqueLetters.map(char => {
          if (!alphabet.includes(char)) {
            alphabet.push(char);
          }
        });
      });

      return alphabet.sort();
    },
    _getRows(alphabet) {
      let automaton = {"q0": []};
      this.tokens.map(token => {
        const characters = token.split("");
        const firstCharacter = characters[0];
        const initialState = "q0";

        if (Object.keys(automaton[initialState]).includes(firstCharacter)) {
          let char = firstCharacter
          let currentState = initialState;
          for (let i = 0; i < characters.length; i++) {
            const nextState = automaton[currentState][char];
            if (!nextState) {
              window.console.log(`===>>> A trilha deve ser criada para ${token}: Estado atual: ${currentState} | Caracter atual: ${char}`, automaton);
              const nextStateNumber = this._defineNextState(automaton);
              automaton[currentState][char] = `q${nextStateNumber}`;
              const newStates = this._generateNewStates(alphabet.length, token, i, nextStateNumber);
              const keys = Object.keys(newStates);
              keys.map(key => automaton[key] = newStates[key]);
              break;
            }

            char = characters[i + 1];
            currentState = nextState;
          }
        } else {
          const nextStateNumber = this._defineNextState(automaton);
          automaton[initialState][firstCharacter] = `q${nextStateNumber}`;
          const newStates = this._generateNewStates(alphabet.length, token, 0, nextStateNumber);
          const keys = Object.keys(newStates);
          keys.map(key => automaton[key] = newStates[key]);
        }
      });

      window.console.log("=> Autômato Final", automaton);
      return automaton;
    },
    _defineNextState(currentAutomaton) {
      const states = Object.keys(currentAutomaton);
      const lastState = states[states.length - 1];
      const lastStateNumber = parseInt(lastState.split("q").pop());
      const nextStateNumber = lastStateNumber + 1;

      return nextStateNumber;
    },
    _generateNewStates(numberOfColumns, token, tokenStartIndex, currentStateNumber) {
      let newStates = {};
      const currentToken = token.substr(tokenStartIndex + 1);
      currentToken.split("").map(char => {
        const nextStateNumber = currentStateNumber + 1;
        newStates[`q${currentStateNumber}`] = [];
        newStates[`q${currentStateNumber}`][char] = `q${nextStateNumber}`;
        currentStateNumber = nextStateNumber;
      });
      newStates[`q${currentStateNumber}`] = Array(numberOfColumns).fill("-");

      window.console.log(`Novos estados gerados para ${currentToken}! `, newStates);
      return newStates;
    }
  },

  watch: {
    tokens() {
      this._buildAutomaton();
    }
  }
};
</script>
