# Contributing to Ilorin Navigator

Thanks for your interest in contributing! Below are a few guidelines to help your PR get accepted quickly.

How to contribute

- Open an issue describing the bug or feature if one does not already exist.
- Fork the repo and create a small, focused branch for your change.
- Run tests (if present) and ensure `pnpm lint` and `pnpm typecheck` pass locally.
- Submit a pull request with a clear title and description. Link the issue if relevant.

Coding style

- Follow existing TypeScript and React patterns in `src/`.
- Use Tailwind utility classes for styling where appropriate.
- Keep components small and reusable. Add unit tests for new logic where feasible.

Environment variables

- If your change requires new environment variables, add them to `.env.example` and document usage in the README.

Review process

- PRs should be small and atomic. Large changes may be requested to be split into smaller PRs.
- A maintainer will review and request changes or approve. Address comments promptly.

Thank you for contributing!
