package hwr.backend1.settings;

import hwr.backend1.settings.dto.*;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class HardcodedSettingsServiceImpl implements SettingsService{
    private static final int DEFAULT_TOTAL_SPINS = 0;
    private static final BigDecimal DEFAULT_WIN_RATE = BigDecimal.ZERO;
    private static final int DEFAULT_BEST_PAYOUT = 0;
    private static final long DEFAULT_DEMO_BALANCE = 1000L;

    private StatisticsSummaryDTO statistics = new StatisticsSummaryDTO(
            2480,
            new BigDecimal("31.8"),
            50
    );

    private long activeDemoBalance = DEFAULT_DEMO_BALANCE;

    private final List<SpinHistoryEntryDTO> historyEntries = new ArrayList<>(
            List.of(
                    new SpinHistoryEntryDTO(2480L, "Bell x5", 500),
                    new SpinHistoryEntryDTO(2479L, "Cherries x4", 160),
                    new SpinHistoryEntryDTO(2478L, "No win", -20),
                    new SpinHistoryEntryDTO(2477L, "Watermelon x3", 60)
            )
    );

    @Override
    public SettingsOverviewDTO getOverview() {
        return new SettingsOverviewDTO(
                "No changes applied yet.",
                activeDemoBalance,
                statistics,
                historyEntries.size(),
                7
        );
    }

    @Override
    public StatisticsResetResponseDTO resetStatistics() {
        statistics = new StatisticsSummaryDTO(
                DEFAULT_TOTAL_SPINS,
                DEFAULT_WIN_RATE,
                DEFAULT_BEST_PAYOUT
        );

        return new StatisticsResetResponseDTO(
                "Statistics reset successfully.",
                statistics
        );
    }

    @Override
    public ClearHistoryResponseDTO clearHistory(ClearHistoryRequestDTO requestDto) {
        int requestedCount = requestDto.entriesToClear() == null ? historyEntries.size() : requestDto.entriesToClear();
        int actualCount = Math.min(requestedCount, historyEntries.size());

        List<SpinHistoryEntryDTO> removedEntries = new ArrayList<>(historyEntries.subList(0, actualCount));
        historyEntries.subList(0, actualCount).clear();

        return new ClearHistoryResponseDTO(
                "History cleared successfully.",
                actualCount,
                historyEntries.size(),
                removedEntries
        );
    }

    @Override
    public DemoBalanceResponseDTO setDemoBalance(DemoBalanceRequestDTO requestDto) {
        activeDemoBalance = requestDto.demoCredits();

        return new DemoBalanceResponseDTO(
                "Demo balance updated successfully.",
                activeDemoBalance
        );
    }

    @Override
    public SlotConfigurationDTO getConfiguration() {
        return new SlotConfigurationDTO(
                5,
                3,
                10,
                1,
                100,
                20,
                "50x max payout highlight"
        );
    }
}
