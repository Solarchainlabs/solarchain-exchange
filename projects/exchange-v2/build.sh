#!/usr/bin/env bash
truffle compile
truffle migrate --f 2 --to 2 --network ethtest --compile-none
truffle run verify SolarExchangeV2 --network ethtest
