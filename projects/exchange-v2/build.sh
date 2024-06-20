#!/usr/bin/env bash
truffle compile
truffle migrate --f 2 --to 2 --network bsctest --compile-none
truffle run verify SolarExchangeV2 --network bsctest