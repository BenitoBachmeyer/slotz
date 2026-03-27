package hwr.backend1.game.dto;

import java.util.List;

public record PaylineDTO(
        int id,
        String name,
        List<Integer> rows
) {}