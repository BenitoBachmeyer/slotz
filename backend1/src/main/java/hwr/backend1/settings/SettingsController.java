package hwr.backend1.settings;

import hwr.backend1.settings.dto.*;
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
    public SettingsOverviewDTO getOverview() {
        return settingsService.getOverview();
    }

    @GetMapping("/configuration")
    public SettingsConfigurationDTO getConfiguration() {
        return settingsService.getConfiguration();
    }

    @PostMapping("/statistics/reset")
    public ResponseEntity<Void> resetStatistics() {
        settingsService.resetStatistics();
        return ResponseEntity.ok().build();
    }

    @PostMapping("/history/clear")
    public ResponseEntity<Void> clearHistory() {
        settingsService.clearHistory();
        return ResponseEntity.ok().build();
    }

    @PostMapping("/demo-balance")
    public DemoBalanceResponseDTO setDemoBalance(@RequestBody DemoBalanceRequestDTO request) {
        return settingsService.setDemoBalance(request);
    }
}