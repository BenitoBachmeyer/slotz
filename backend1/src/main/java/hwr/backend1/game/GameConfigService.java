package hwr.backend1.game;

import hwr.backend1.game.model.Payline;
import hwr.backend1.game.model.SlotConfig;
import hwr.backend1.game.model.SlotSymbol;

import java.util.List;
import java.util.Map;

public interface GameConfigService {
    SlotConfig getSlotConfig();

    int getReels();

    int getRows();

    int getPaylinesCount();

    int getMinBet();

    int getMaxBet();

    int getDefaultBet();

    List<Payline> getPaylines();

    List<SlotSymbol> getSymbols();

    Map<SlotSymbol, Map<Integer, Integer>> getPaytable();

    Integer getMultiplier(SlotSymbol symbol, int matchCount);

    List<List<SlotSymbol>> getReelStrips();
}