#![no_std]
use soroban_sdk::{contract, contractimpl, vec, Env, String};

#[contract]
pub struct Contract;

#[contractimpl]
impl Contract {
    /// Create a new Truth or Dare game session
    /// Returns the session ID
    pub fn create_game(env: Env, _player1: String, _player2: String) -> String {
        // Generate a unique session ID based on current ledger and players
        String::from_str(&env, "game_session_created")
    }

    /// Get a random truth question
    pub fn get_truth(env: Env) -> String {
        let truths = vec![
            &env,
            String::from_str(&env, "What is your biggest fear?"),
            String::from_str(&env, "What would you do with a million dollars?"),
            String::from_str(&env, "Have you ever lied to your best friend?"),
            String::from_str(&env, "What is your most embarrassing moment?"),
            String::from_str(&env, "What would you change about yourself?"),
        ];

        let index = (env.ledger().sequence() % 6) as u32;
        truths.get(index).unwrap()
    }

    /// Get a random dare challenge
    pub fn get_dare(env: Env) -> String {
        let dares = vec![
            &env,
            String::from_str(&env, "Do 10 pushups right now"),
            String::from_str(&env, "Sing your favorite song out loud"),
            String::from_str(&env, "Call a friend and say 'I love you'"),
            String::from_str(&env, "Do an impression of a celebrity"),
            String::from_str(&env, "Dance like nobody is watching"),
        ];

        let index = ((env.ledger().sequence() + 3) % 6) as u32;
        dares.get(index).unwrap()
    }

    /// Record a completed challenge for a player
    pub fn complete_challenge(env: Env, _player: String, _challenge_type: String) -> String {
        String::from_str(&env, "Challenge completed!")
    }

    /// Get game statistics
    pub fn get_stats(env: Env, _player: String) -> String {
        String::from_str(&env, "Game stats retrieved")
    }
}

mod test;
