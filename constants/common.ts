export const DEFAULT_MIN_STAKE_AMOUNT = 0.005;
export const DEFAULT_STAFIHUB_TOKEN_RESERVE_AMOUNT = 0.05;

export const ENCODE_FORMAT_UTF8 = '"utf8"';

export const API_CODE_SUCCESS = "80000";
export const API_CODE_ALREADY_SET_PLAN = "80007";
export const API_CODE_SLIPPAGE_EXCEED = "80014";
export const API_CODE_FAIL_TO_VERIFY_SIGNATURE = "80006";

export const COMMON_ERROR_MESSAGE =
  "Something went wrong, please try again later";
export const CANCELLED_MESSAGE = "Cancelled";
export const REJECTED_MESSAGE = "Transaction rejected";
export const TRANSACTION_FAILED_MESSAGE = "Transaction failed";
export const CONNECTION_ERROR_MESSAGE = "Connection Error";
export const BLOCK_HASH_NOT_FOUND_MESSAGE = "Block hash not found";
export const SIGN_ERROR_MESSAGE = "Sign message rejected";
export const STAFI_ACCOUNT_EMPTY_MESSAGE = "StaFi account not connected";
export const SOLANA_TOKEN_ACCOUNT_EMPTY = "Solana Token Account not created";
export const NO_VALID_POOL_MESSAGE = "No valid pool";
export const NO_ENOUGH_FEE_MESSAGE = "No enough fee in your account";
export const NETWORK_ERR_MESSAGE = "Network exception, please try again later.";
export const NOMINATE_SWITCH_CLOSED_MESSAGE =
  "The system is being upgraded, please try again later";
export const POOL_LIMIT_REACHED_MESSAGE =
  "The cumulative FIS amount exceeds the pool limit, please try again later";

export const PAGE_SIZE = 10;
export const STAFI_SS58_FORMAT = 20;
export const KSM_SS58_FORMAT = 2;
export const DOT_SS58_FORMAT = 0;

export const FAQ_ID_CONFIGURE_FEE = "faq_id_configure_fee";
export const FAQ_ID_SLASH = "faq_id_slash";

export const FAQ_ID_UNSTAKE_ATOM = "faq_id_unstake_atom";
export const FAQ_ID_UNSTAKE_IRIS = "faq_id_unstake_iris";
export const FAQ_ID_UNSTAKE_HUAHUA = "faq_id_unstake_huahua";
export const FAQ_ID_UNSTAKE_SWTH = "faq_id_unstake_swth";
export const FAQ_ID_UNSTAKE_DOT = "faq_id_unstake_dot";
export const FAQ_ID_UNSTAKE_KSM = "faq_id_unstake_ksm";
export const FAQ_ID_UNSTAKE_SOL = "faq_id_unstake_sol";

export const STAKE_SEND_FEE_KSM = "0.0005";
export const STAKE_SEND_FEE_DOT = "0.015";
export const STAKE_SEND_FEE_SOL = "0.0001";

export const POLKADOT_EXTRINSIC_SUCCESS = "ExtrinsicSuccess";
export const POLKADOT_EXTRINSIC_FAILED = "ExtrinsicFailed";
export const POLKADOT_SECTION_SYSTEM = "system";
export const POLKADOT_BOND_STATE_SUCCESS = "Success";
export const POLKADOT_BOND_STATE_FAIL = "Fail";

export const LOADING_MESSAGE_STAKING =
  "Staking processing, please wait for a moment";
export const LOADING_MESSAGE_MINTING =
  "Minting processing, please wait for a moment";
export const LOADING_MESSAGE_UNSTAKING =
  "Unstaking processing, please wait for a moment";
export const LOADING_MESSAGE_WITHDRAWING =
  "Withdrawing processing, please wait for a moment";
export const LOADING_MESSAGE_SWAPPING =
  "Swapping processing, please wait for a moment";
export const LOADING_MESSAGE_DEPOSITING =
  "Depositing processing, please wait for a moment";
export const LOADING_MESSAGE_WITHDRAW_ERROR =
  "Withdraw error, please try again later";
export const LOADING_MESSAGE_APPROVE_PHANTOM_CREATE_TOKEN =
  "Please approve create token account request in Phantom wallet";

export const STAFIHUB_ERROR_REASON_REJECT = "Request rejected";
export const STAFIHUB_ERROR_REASON_EXTENSION_CONTEXT_INVALID =
  "Extension context invalidated.";

export const ERROR_MESSAGE_EXTENSION_CONTEXT_INVALID =
  "Extension context invalidated, please refresh and retry.";

export const TOAST_MESSAGE_INCREASE_GAS =
  "Something went wrong, please increase the gas and try again!";
export const TOAST_MESSAGE_CHECK_STATUS_TIMEOUT =
  "Check status timeout, please try again later.";
export const TOAST_MESSAGE_LOW_BALANCE_FOR_FEE =
  "Insufficient Balance for fee payment";
export const TOAST_MESSAGE_ADDRESS_FORMAT_ERROR = "Address format error";

export const IBC_DENOM_PREFIX = "ibc/";

export const POLKADOT_EXTENSION_APP_NAME = "stafi/rtoken";
export const POLKADOT_EXTENSION_SOURCE = "polkadot-js";

export const THROW_ERROR_CONNECT_POLKADOT = "Please connect Polkadot.js";
export const THROW_ERROR_NO_WITHDRAW = "Nothing to withdraw";
export const THROW_ERROR_CREATE_ACCOUNT_FAIL = "Create Token Account failed";
export const THROW_ERROR_CHAIN_CONFIG_EMPTY = "ChainConfig can not be empty";
export const THROW_ERROR_UNKNOWN_SPL = "Unknown spl token";
