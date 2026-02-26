# Chat App

Real-time chat application built with Rails, ActionCable, and Stimulus.

## Features

- Create or select users
- Start conversations with other users
- Real-time message broadcasting
- Online/offline presence indicators
- Typing indicators
- Auto-scroll to latest messages

## Setup

```bash
bundle install
rails db:create db:migrate
```

## Running

Start the Rails server:
```bash
bin/rails server
```

Start Sidekiq (in another terminal):
```bash
bundle exec sidekiq
```

Make sure Redis is running on `localhost:16381` (dev) or set `REDIS_URL` env var.

## Architecture

- **Models**: User, Conversation, Participant, Message
- **ActionCable**: PresenceChannel, TypingChannel
- **Stimulus Controllers**: presence, typing, message_styling, scroll_to_bottom
- **Real-time**: Turbo Streams + ActionCable over Redis
