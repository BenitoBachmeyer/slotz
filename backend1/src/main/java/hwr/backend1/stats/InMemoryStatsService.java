package hwr.backend1.stats;

import hwr.backend1.history.model.SpinRecord;
import hwr.backend1.stats.dto.StatsDTO;
import org.springframework.stereotype.Service;

@Service
public class InMemoryStatsService implements StatsService {
    private int totalSpins = 0;
    private int winningSpins = 0;
    private int totalBetAmount = 0;
    private int totalPayout = 0;
    private int bestPayout = 0;

    @Override
    public StatsDTO getStats() {
        double winRate = totalSpins == 0
                ? 0.0
                : ((double) winningSpins / totalSpins) * 100.0;

        int netResult = totalPayout - totalBetAmount;

        return new StatsDTO(
                totalSpins,
                winningSpins,
                winRate,
                totalBetAmount,
                totalPayout,
                netResult,
                bestPayout
        );
    }

    @Override
    public void registerSpin(SpinRecord spinRecord) {
        totalSpins++;
        totalBetAmount += spinRecord.betAmount();
        totalPayout += spinRecord.totalWin();

        if (spinRecord.totalWin() > 0) {
            winningSpins++;
        }

        if (spinRecord.totalWin() > bestPayout) {
            bestPayout = spinRecord.totalWin();
        }
    }

    @Override
    public void resetStats() {
        totalSpins = 0;
        winningSpins = 0;
        totalBetAmount = 0;
        totalPayout = 0;
        bestPayout = 0;
    }
}
