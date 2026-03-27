package hwr.backend1.game.model;

import java.util.List;

public record Payline (
        int id,
        String name,
        List<Integer> rows
) {}
