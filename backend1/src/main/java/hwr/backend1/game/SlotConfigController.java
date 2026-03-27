package hwr.backend1.game;

import hwr.backend1.game.dto.SlotConfigDTO;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SlotConfigController {
    private final GameConfigService gameConfigService;

    public SlotConfigController(GameConfigService gameConfigService) {
        this.gameConfigService = gameConfigService;
    }

    @GetMapping("/api/slot-config")
    public SlotConfigDTO getSlotConfig() {
        return SlotConfigMapper.toDto(gameConfigService.getSlotConfig());
    }
}
