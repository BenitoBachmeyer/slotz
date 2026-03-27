package hwr.backend1.settings;

import hwr.backend1.game.GameConfigService;
import hwr.backend1.history.SpinHistoryService;
import hwr.backend1.settings.dto.DemoBalanceRequestDTO;
import hwr.backend1.settings.dto.DemoBalanceResponseDTO;
import hwr.backend1.settings.dto.SettingsConfigurationDTO;
import hwr.backend1.settings.dto.SettingsOverviewDTO;
import hwr.backend1.stats.StatsService;
import hwr.backend1.stats.dto.StatsDTO;
import org.springframework.stereotype.Service;

@Service
public class SettingsServiceImpl implements SettingsService {
    private final GameConfigService gameConfigService;
    private final StatsService statsService;
    private final SpinHistoryService spinHistoryService;

    private int currentDemoBalance = 1000;

    public SettingsServiceImpl(
            GameConfigService gameConfigService,
            StatsService statsService,
            SpinHistoryService spinHistoryService
    ) {
        this.gameConfigService = gameConfigService;
        this.statsService = statsService;
        this.spinHistoryService = spinHistoryService;
    }

    @Override
    public SettingsOverviewDTO getOverview() {
        StatsDTO stats = statsService.getStats();

        return new SettingsOverviewDTO(
                currentDemoBalance,
                stats.totalSpins(),
                spinHistoryService.getRecentSpins().size(),
                gameConfigService.getMinBet(),
                gameConfigService.getMaxBet(),
                gameConfigService.getDefaultBet()
        );
    }

    @Override
    public SettingsConfigurationDTO getConfiguration() {
        return new SettingsConfigurationDTO(
                gameConfigService.getReels(),
                gameConfigService.getRows(),
                gameConfigService.getPaylinesCount(),
                gameConfigService.getMinBet(),
                gameConfigService.getMaxBet(),
                gameConfigService.getDefaultBet()
        );
    }

    @Override
    public void resetStatistics() {
        statsService.resetStats();
    }

    @Override
    public void clearHistory() {
        spinHistoryService.clearHistory();
    }

    @Override
    public DemoBalanceResponseDTO setDemoBalance(DemoBalanceRequestDTO request) {
        if (request.balance() < 0) {
            throw new IllegalArgumentException("Demo balance must not be negative");
        }

        currentDemoBalance = request.balance();

        return new DemoBalanceResponseDTO(
                currentDemoBalance,
                "Demo balance updated successfully"
        );
    }
}
