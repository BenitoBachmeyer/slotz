package hwr.backend1.settings;

import hwr.backend1.settings.dto.*;

public interface SettingsService {
    SettingsOverviewDTO getOverview();

    SettingsConfigurationDTO getConfiguration();

    void resetStatistics();

    void clearHistory();

    DemoBalanceResponseDTO setDemoBalance(DemoBalanceRequestDTO request);
}
