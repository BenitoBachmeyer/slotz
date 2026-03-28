package hwr.backend1.balance;

public interface BalanceService {
    int getCurrentBalance();
    void setCurrentBalance(int balance);
    void applySpinResult(int betAmount, int totalWin);
    boolean hasEnoughCredits(int betAmount);
    void resetToDefault();
}
