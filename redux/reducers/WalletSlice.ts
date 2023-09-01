import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getEthereumChainId } from "config/env";
import { metaMask } from "connectors/metaMask";
import snackbarUtil from "utils/snackbarUtils";
import {
  STORAGE_KEY_DISCONNECT_METAMASK,
  saveStorage,
} from "utils/storageUtils";
import { AppThunk } from "../store";

export interface WalletState {
  metaMaskAccount: string | undefined;
  metaMaskChainId: string | undefined;
  metaMaskDisconnected: boolean;
}

const initialState: WalletState = {
  metaMaskAccount: undefined,
  metaMaskChainId: undefined,
  metaMaskDisconnected: false,
};

export const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setMetaMaskAccount: (
      state: WalletState,
      action: PayloadAction<string | undefined>
    ) => {
      state.metaMaskAccount = action.payload;
    },
    setMetaMaskChainId: (
      state: WalletState,
      action: PayloadAction<string | undefined>
    ) => {
      state.metaMaskChainId = action.payload;
    },
    setMetaMaskDisconnected: (
      state: WalletState,
      action: PayloadAction<boolean>
    ) => {
      saveStorage(STORAGE_KEY_DISCONNECT_METAMASK, action.payload ? "1" : "");
      state.metaMaskDisconnected = action.payload;
    },
  },
});

export const {
  setMetaMaskAccount,
  setMetaMaskChainId,
  setMetaMaskDisconnected,
} = walletSlice.actions;

export default walletSlice.reducer;

/**
 * connect to MetaMask.
 */
export const connectMetaMask =
  (targetChainId: number | undefined, cb?: Function): AppThunk =>
  async (dispatch, getState) => {
    try {
      const handleError = (err: any) => {
        snackbarUtil.error(err.message);
        cb && cb(false);
      };

      metaMask
        .activate(targetChainId)
        .then(() => {
          cb && cb(true);
        })
        .catch(handleError);

      dispatch(setMetaMaskDisconnected(false));
    } catch (err: unknown) {}
  };

/**
 * disconnect from wallet
 */
export const disconnectWallet = (): AppThunk => async (dispatch, getState) => {
  dispatch(setMetaMaskDisconnected(true));
};
