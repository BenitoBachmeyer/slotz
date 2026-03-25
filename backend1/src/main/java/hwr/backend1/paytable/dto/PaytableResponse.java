package hwr.backend1.paytable.dto;

import java.util.List;

public record PaytableResponse(String id, String name, String imageKey, List<PayoutDTO> payouts) {
}
