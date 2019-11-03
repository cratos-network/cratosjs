
class Message {

    constructor () {

    }

    _NewMsgSend(input) {
        return {
            json:
            {
                account_number: String(input.account_number),
                chain_id: this.chainId,
                fee: {
                    amount: [
                        {
                            amount: String(input.fee),
                            denom: input.feeDenom
                        }
                    ],
                    gas: String(input.gas)
                },
                memo: input.memo,
                msgs: [
                    {
                        type: input.type,
                        value: {
                            amount: [
                                {
                                    amount: String(input.amount),
                                    denom: input.amountDenom
                                }
                            ],
                            from_address: input.from_address,
                            to_address: input.to_address
                        }
                    }
                ],
                sequence: String(input.sequence)
            }
        }
    }

    _NewMsgDelegate(input) {
        return {
            json:

            {
                account_number: String(input.account_number),
                chain_id: this.chainId,
                fee: {
                    amount: [
                        {
                            amount: String(input.fee),
                            denom: input.feeDenom
                        }
                    ],
                    gas: String(input.gas)
                },
                memo: input.memo,
                msgs: [
                    {
                        type: input.type,
                        value: {
                            amount: {
                                amount: String(input.amount),
                                denom: input.amountDenom
                            },
                            delegator_address: input.delegator_address,
                            validator_address: input.validator_address
                        }
                    }
                ],
                sequence: String(input.sequence)
            }
        }
    }


    _NewMsgUndelegate(input) {
        return {
            json:
            {
                account_number: String(input.account_number),
                chain_id: this.chainId,
                fee: {
                    amount: [
                        {
                            amount: String(input.fee),
                            denom: input.feeDenom
                        }
                    ],
                    gas: String(input.gas)
                },
                memo: input.memo,
                msgs: [
                    {
                        type: input.type,
                        value: {
                            amount: {
                                amount: String(input.amount),
                                denom: input.amountDenom
                            },
                            delegator_address: input.delegator_address,
                            validator_address: input.validator_address
                        }
                    }
                ],
                sequence: String(input.sequence)
            }
        }
    }


    _NewMsgWithdrawDelegationReward(input) {
        return {
            json:
            {
                account_number: String(input.account_number),
                chain_id: this.chainId,
                fee: {
                    amount: [
                        {
                            amount: String(input.fee),
                            denom: input.feeDenom
                        }
                    ],
                    gas: String(input.gas)
                },
                memo: input.memo,
                msgs: [
                    {
                        type: input.type,
                        value: {
                            delegator_address: input.delegator_address,
                            validator_address: input.validator_address
                        }
                    }
                ],
                sequence: String(input.sequence)
            }
        }
    }

    _NewMsgSubmitProposal(input) {
        return {
            json:
            {
                account_number: String(input.account_number),
                chain_id: this.chainId,
                fee: {
                    amount: [
                        {
                            amount: String(input.fee),
                            denom: input.feeDenom
                        }
                    ],
                    gas: String(input.gas)
                },
                memo: input.memo,
                msgs: [
                    {
                        type: input.type,
                        value: {
                            description: input.description,
                            initial_deposit: [
                                {
                                    amount: String(input.initialDepositAmount),
                                    denom: input.initialDepositDenom
                                }
                            ],
                            proposal_type: input.proposal_type,
                            proposer: input.proposer,
                            title: input.title
                        }
                    }
                ],
                sequence: String(input.sequence)
            }
        }
    }


    _NewMsgDeposit(input) {
        return {
            json:
            {
                account_number: String(input.account_number),
                chain_id: this.chainId,
                fee: {
                    amount: [
                        {
                            amount: String(input.fee),
                            denom: input.feeDenom
                        }
                    ],
                    gas: String(input.gas)
                },
                memo: input.memo,
                msgs: [
                    {
                        type: input.type,
                        value: {
                            amount: [
                                {
                                    amount: String(input.amount),
                                    denom: input.amountDenom
                                }
                            ],
                            depositor: input.depositor,
                            proposal_id: String(input.proposal_id)
                        }
                    }
                ],
                sequence: String(input.sequence)
            }
        }
    }

    _NewMsgVote(input) {
        return {
            json:
            {
                account_number: String(input.account_number),
                chain_id: this.chainId,
                fee: {
                    amount: [
                        {
                            amount: String(input.fee),
                            denom: input.feeDenom
                        }
                    ],
                    gas: String(input.gas)
                },
                memo: input.memo,
                msgs: [
                    {
                        type: input.type,
                        value: {
                            option: input.option,
                            proposal_id: String(input.proposal_id),
                            voter: input.voter
                        }
                    }
                ],
                sequence: String(input.sequence)
            }
        }
    }

    _NewMsgBeginRedelegate(input) {
        return {
            json:
            {
                account_number: String(input.account_number),
                chain_id: this.chainId,
                fee: {
                    amount: [
                        {
                            amount: String(input.fee),
                            denom: input.feeDenom
                        }
                    ],
                    gas: String(input.gas)
                },
                memo: input.memo,
                msgs: [
                    {
                        type: input.type,
                        value: {
                            amount: {
                                amount: String(input.amount),
                                denom: input.amountDenom
                            },
                            delegator_address: input.delegator_address,
                            validator_dst_address: input.validator_dst_address,
                            validator_src_address: input.validator_src_address
                        }
                    }
                ],
                sequence: String(input.sequence)
            }
        }
    }

    _NewMsgModifyWithdrawAddress(input) {
        return {
            json:
            {
                account_number: String(input.account_number),
                chain_id: this.chainId,
                fee: {
                    amount: [
                        {
                            amount: String(input.fee),
                            denom: input.feeDenom
                        }
                    ],
                    gas: String(input.gas)
                },
                memo: input.memo,
                msgs: [
                    {
                        type: input.type,
                        value: {
                            delegator_address: input.delegator_address,
                            withdraw_address: input.withdraw_address
                        }
                    }
                ],
                sequence: String(input.sequence)
            }
        }
    }
}
