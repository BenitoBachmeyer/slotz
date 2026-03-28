package hwr.backend1.spin.dto;

public class SpinErrorResponseDTO {

    private String message;
    private int currentBalance;
    private int requiredBet;

    public SpinErrorResponseDTO() {
    }

    public SpinErrorResponseDTO(String message, int currentBalance, int requiredBet) {
        this.message = message;
        this.currentBalance = currentBalance;
        this.requiredBet = requiredBet;
    }

    public String getMessage() {
        return message;
    }

    public int getCurrentBalance() {
        return currentBalance;
    }

    public int getRequiredBet() {
        return requiredBet;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setCurrentBalance(int currentBalance) {
        this.currentBalance = currentBalance;
    }

    public void setRequiredBet(int requiredBet) {
        this.requiredBet = requiredBet;
    }
}
