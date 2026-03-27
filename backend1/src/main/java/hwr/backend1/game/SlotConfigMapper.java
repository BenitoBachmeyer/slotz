package hwr.backend1.game;

import hwr.backend1.game.dto.PaylineDTO;
import hwr.backend1.game.dto.SlotConfigDTO;
import hwr.backend1.game.dto.SymbolPayoutDTO;
import hwr.backend1.game.model.Payline;
import hwr.backend1.game.model.SlotConfig;
import hwr.backend1.game.model.SlotSymbol;

import java.util.List;
import java.util.Map;

public class SlotConfigMapper {
    private SlotConfigMapper() {
    }

    public static SlotConfigDTO toDto(SlotConfig slotConfig) {
        return new SlotConfigDTO(
                slotConfig.reels(),
                slotConfig.rows(),
                slotConfig.paylines(),
                slotConfig.minBet(),
                slotConfig.maxBet(),
                slotConfig.defaultBet(),
                mapPaylines(slotConfig.paylineDefinitions()),
                mapSymbols(slotConfig.paytable())
        );
    }

    private static List<PaylineDTO> mapPaylines(List<Payline> paylines) {
        return paylines.stream()
                .map(payline -> new PaylineDTO(
                        payline.id(),
                        payline.name(),
                        payline.rows()
                ))
                .toList();
    }

    private static List<SymbolPayoutDTO> mapSymbols(Map<SlotSymbol, Map<Integer, Integer>> paytable) {
        return paytable.entrySet().stream()
                .map(entry -> new SymbolPayoutDTO(
                        entry.getKey().name(),
                        entry.getValue()
                ))
                .toList();
    }
}
