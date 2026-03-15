#![cfg(test)]

use super::*;
use soroban_sdk::{vec, Env, String};

#[test]
fn test_create_game() {
    let env = Env::default();
    let contract_id = env.register(Contract, ());
    let client = ContractClient::new(&env, &contract_id);

    let player1 = String::from_str(&env, "Alice");
    let player2 = String::from_str(&env, "Bob");
    
    let session_id = client.create_game(&player1, &player2);
    assert!(session_id.len() > 0);
}

#[test]
fn test_get_truth() {
    let env = Env::default();
    let contract_id = env.register(Contract, ());
    let client = ContractClient::new(&env, &contract_id);

    let truth = client.get_truth();
    assert!(truth.len() > 0);
}

#[test]
fn test_get_dare() {
    let env = Env::default();
    let contract_id = env.register(Contract, ());
    let client = ContractClient::new(&env, &contract_id);

    let dare = client.get_dare();
    assert!(dare.len() > 0);
}

#[test]
fn test_complete_challenge() {
    let env = Env::default();
    let contract_id = env.register(Contract, ());
    let client = ContractClient::new(&env, &contract_id);

    let player = String::from_str(&env, "Alice");
    let challenge_type = String::from_str(&env, "truth");
    
    let result = client.complete_challenge(&player, &challenge_type);
    assert!(result.len() > 0);
}

#[test]
fn test_get_stats() {
    let env = Env::default();
    let contract_id = env.register(Contract, ());
    let client = ContractClient::new(&env, &contract_id);

    let player = String::from_str(&env, "Alice");
    
    let stats = client.get_stats(&player);
    assert!(stats.len() > 0);
}
