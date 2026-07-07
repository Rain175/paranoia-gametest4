# Firestore Security Specification

This document outlines the security architecture, invariants, and threat vectors for the Paranoia online game.

## 1. Data Invariants

### GameRoom (`/game_rooms/{roomCode}`)
- **Unique Identifier**: Document ID must be the 4-character room code.
- **Room Status Flow**: Transitions from `lobby` -> `playing` -> `ended`. It is terminal once `ended`.
- **Phase Flow**: Transitions between `question` and `result` during gameplay.
- **Key Validation**: Keys are strictly bounded to prevent the injection of arbitrary payload attributes.
- **Host Session**: Tracked by `host_session_id`. Only the player with the host session ID can perform host actions (like starting the game).

### RoomPlayer (`/room_players/{playerId}`)
- **Affiliation**: Every player document must tie to a valid, existing `room_code`.
- **Structure**: Includes `name`, `session_id`, `order`, and `is_host`.

---

## 2. The "Dirty Dozen" Payloads (Attack Vectors)

We design the following 12 malicious payloads targeting system rules:

1. **Host Impersonation Attack**: A player tries to update a room's state (e.g., status, categories) when their local session ID doesn't match `host_session_id`.
2. **Terminal State Regression**: Attempting to move a room's status from `ended` back to `lobby` or `playing`.
3. **Ghost Attribute Injection**: Attempting to insert a malicious hidden field (e.g., `isAdmin: true` or `cheatMode: true`) into a room document during creation or update.
4. **Invalid Room Code ID Poisoning**: Trying to create a room with an excessively large or containing special-character code ID (e.g., `A#C_LONG_POISONING_ID`).
5. **Overlong Display Name**: Injecting a massive string (e.g., 1MB) as a player's `name` to perform a resource-exhaustion denial of service.
6. **Self-Promoting Host Hijack**: A player creating a `room_players` record for an existing room where they claim `is_host: true` when they are not the creator.
7. **Negative Player Order**: Joining a room and setting a negative `order` index to break sorting and turn order.
8. **Direct Question Injection**: Attempting to overwrite the randomized questions list with a curated list containing malicious scripts or offensive text.
9. **Coin Flip Results Manipulation**: Overwriting `coin_result` directly during the question phase without transitioning the phase to `result`.
10. **State Skipping**: Forcing the `phase` directly from `question` to an arbitrary invalid value like `admin_bypass`.
11. **Orphaned Player Entry**: Adding a `room_players` record for a non-existent `room_code`.
12. **Foreign Player Write Hijacking**: Attempting to update another player's `room_players` record (mismatching session IDs).

---

## 3. Test Specification

We write the following test rules to verify that all Dirty Dozen payloads return `PERMISSION_DENIED` under normal database execution paths.
This is implemented in `DRAFT_firestore.rules` and finalized in `firestore.rules`.
