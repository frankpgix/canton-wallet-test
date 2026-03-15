import { get, post } from '@/utils/http'

export interface WalletBalanceResponse {
  round: number
  effective_unlocked_qty: string
  effective_locked_qty: string
  total_holding_fees: string
}

export interface TransactionsRequest {
  page_size: number
  // Add other optional fields if needed, e.g. page_token
}

export interface TransactionItem {
  transaction_type: string
  transaction_subtype: {
    template_id: string
    choice: string
    amulet_operation: null | unknown
    interface_id: null | unknown
  }
  event_id: string
  date: string
  sender?: {
    party: string
    amount: string
  }
  receivers: Array<{
    party: string
    amount: string
  }>
  holding_fees?: string
  app_rewards_used?: string
  validator_rewards_used?: string
  sv_rewards_used?: string
  development_fund_coupons_used?: string
  transfer_instruction_receiver?: null | unknown
  transfer_instruction_amount?: null | unknown
  transfer_instruction_cid?: null | unknown
  description?: null | string
}

export interface TransactionsResponse {
  items: TransactionItem[]
}

export interface TapRequest {
  amount: string
}

export interface TapResponse {
  contract_id: string
}

export interface TransferRequest {
  receiver_party_id: string
  amount: string
  description?: string
  expires_at?: number
  tracking_id?: string
}

export interface TransferResponse {
  output: {
    receiver_holding_cids: string[]
  }
  sender_change_cids: string[]
  meta: Record<string, unknown>
}

export const getWalletBalance = () => {
  return get<WalletBalanceResponse>('wallet/balance')
}

export const getTransactions = (data: TransactionsRequest) => {
  return post<TransactionsResponse>('wallet/transactions', data)
}

export const tap = (data: TapRequest) => {
  return post<TapResponse>('wallet/tap', data)
}

export const transfer = (data: TransferRequest) => {
  return post<TransferResponse>('wallet/token-standard/transfers', data)
}
