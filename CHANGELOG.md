# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

### Changed

### Deprecated

### Removed

### Fixed

### Security

---

## [0.6.0] - 2021-03-26

### Added

- state-watcher now comes with type-defs!

### Changed

- `Infinity` callbacks will now call even when a `field` callback is defined.
- `watcher.has` now returns an Array of strings rather than an Iterable.

### Fixed

- `klona` is now marked as an external dependency. This was a mistake in how I had originally configured the bundler and was arguably a poor choice.
