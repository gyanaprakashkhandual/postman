# Security Policy

---

## Overview

This repository is open source. The code, documentation, scripts, and collection files are freely available for reading, forking, and adaptation.

The live API associated with this project is **strictly private** and is not part of the open source grant. This document defines the security boundaries clearly and describes how to report vulnerabilities responsibly.

---

## API Access Restriction

The API hosted at `https://toodoo-2o5c.onrender.com` is not available for public use.

**The following actions are explicitly prohibited:**

- Sending any request to the live API, whether manual or automated
- Using credentials, tokens, or secrets found anywhere in this repository
- Attempting to authenticate with the live API for any reason
- Probing, scanning, or fuzzing any endpoint on the live server
- Attempting to discover, enumerate, or exploit the infrastructure
- Using the live API as a test target for security research, load testing, or any other purpose

This restriction applies to all users of this repository, including contributors, forkers, and anyone who has cloned or viewed the code.

**Violation of this policy may constitute unauthorized computer access under applicable law, including but not limited to the Computer Fraud and Abuse Act (CFAA) and similar legislation in other jurisdictions.**

---

## What the Open Source License Covers

The open source license grants the following rights over the non-API materials in this repository only:

- Reading and studying the code
- Forking the repository
- Cloning locally for personal use
- Adapting the code structure, scripts, and documentation for your own projects
- Submitting issues and pull requests

The live API is entirely outside the scope of these permissions.

---

## Reporting a Security Vulnerability

If you discover a security vulnerability in the codebase itself — such as a hardcoded secret, an exposed credential, or a misconfiguration in the repository — please report it responsibly.

**Do not open a public issue for security vulnerabilities.**

Instead, contact the repository owner directly through GitHub by navigating to the profile and using the available contact options.

When reporting, please include:

- A clear description of the vulnerability
- The affected file or section
- Steps to reproduce if applicable
- Your assessment of the potential impact

You will receive a response as soon as possible. Responsible disclosures are appreciated and will be acknowledged.

---

## Supported Versions

| Component       | Status                     |
| --------------- | -------------------------- |
| Repository code | Actively maintained        |
| Live API        | Private, no public support |
| Documentation   | Actively maintained        |

---

## Summary

| Action                             | Permitted      |
| ---------------------------------- | -------------- |
| Read the code                      | Yes            |
| Fork the repository                | Yes            |
| Adapt scripts and documentation    | Yes            |
| Call the live API                  | No             |
| Use live API credentials or tokens | No             |
| Test or probe the live API server  | No             |
| Report a vulnerability in the code | Yes, privately |
