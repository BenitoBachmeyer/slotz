package hwr.backend1.settings;

import hwr.backend1.settings.dto.*;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/settings")
public class SettingsController {

    private final SettingsService settingsService;

    public SettingsController(SettingsService settingsService) {
        this.settingsService = settingsService;
    }

    @GetMapping("/overview")
    public ResponseEntity<SettingsOverviewDTO> getOverview() {
        return ResponseEntity.ok(settingsService.getOverview());
    }

    @PostMapping("/statistics/reset")
    public ResponseEntity<StatisticsResetResponseDTO> resetStatistics() {
        return ResponseEntity.ok(settingsService.resetStatistics());
    }

    @PostMapping("/history/clear")
    public ResponseEntity<ClearHistoryResponseDTO> clearHistory(
            @Valid @RequestBody ClearHistoryRequestDTO requestDto
    ) {
        return ResponseEntity.ok(settingsService.clearHistory(requestDto));
    }

    @PostMapping("/demo-balance")
    public ResponseEntity<DemoBalanceResponseDTO> setDemoBalance(
            @Valid @RequestBody DemoBalanceRequestDTO requestDto
    ) {
        return ResponseEntity.ok(settingsService.setDemoBalance(requestDto));
    }

    @GetMapping("/configuration")
    public ResponseEntity<SlotConfigurationDTO> getConfiguration() {
        return ResponseEntity.ok(settingsService.getConfiguration());
    }
}