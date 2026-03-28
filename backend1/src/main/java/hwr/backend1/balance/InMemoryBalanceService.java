package hwr.backend1.balance;

import org.springframework.stereotype.Service;

@Service
public class InMemoryBalanceService implements BalanceService {

    private static final int DEFAULT_BALANCE = 1000;

    private int currentBalance = 1000;

    @Override
    public int getCurrentBalance() {
        return currentBalance;
    }

    @Override
    public void setCurrentBalance(int balance) {
        this.currentBalance = Math.max(balance, 0);
    }

    @Override
    public void applySpinResult(int betAmount, int totalWin) {
        currentBalance = currentBalance - betAmount + totalWin;
        if(currentBalance < 0) {
            currentBalance = 0;
        }
    }

    @Override
    public boolean hasEnoughCredits(int betAmount) {
        return betAmount > 0 && currentBalance >= betAmount;
    }

    @Override
    public void resetToDefault() {
        currentBalance = DEFAULT_BALANCE;
    }
}
