package hwr.backend1.settings;

import hwr.backend1.settings.dto.*;

public interface SettingsService {
    SettingsOverviewDTO getOverview();

    StatisticsResetResponseDTO resetStatistics();

    ClearHistoryResponseDTO clearHistory(ClearHistoryRequestDTO requestDto);

    DemoBalanceResponseDTO setDemoBalance(DemoBalanceRequestDTO requestDto);

    SlotConfigurationDTO getConfiguration();
}
