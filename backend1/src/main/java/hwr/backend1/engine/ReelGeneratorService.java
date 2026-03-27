package hwr.backend1.engine;

import hwr.backend1.game.model.SlotSymbol;

public interface ReelGeneratorService {
    SlotSymbol[][] generateMatrix();
}