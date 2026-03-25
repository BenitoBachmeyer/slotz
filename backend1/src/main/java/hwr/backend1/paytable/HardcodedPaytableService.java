package hwr.backend1.paytable;

import hwr.backend1.paytable.dto.PayoutDTO;
import hwr.backend1.paytable.dto.PaytableResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HardcodedPaytableService implements PaytableService {

    @Override
    public List<PaytableResponse> retrievePaytableList() {
        PaytableResponse lemon = createPaytableItem("lemon", "Lemon", "lemon", 2, 5, 10);
        PaytableResponse banana = createPaytableItem("banana", "Banana", "banana", 3, 6, 12);
        PaytableResponse grape = createPaytableItem("grape", "Grape", "grape", 4, 8, 16);
        PaytableResponse strawberry = createPaytableItem("strawberry", "Strawberry", "strawberry", 5, 10, 20);
        PaytableResponse watermelon = createPaytableItem("watermelon", "Watermelon", "watermelon", 6, 12, 24);
        PaytableResponse cherry = createPaytableItem("cherry", "Cherry", "cherry", 8, 16, 32);
        PaytableResponse bell = createPaytableItem("bell", "Bell", "bell", 12, 25, 50);

        return List.of(
                lemon,
                banana,
                grape,
                strawberry,
                watermelon,
                cherry,
                bell
        );
    }

    private PaytableResponse createPaytableItem(String id, String name, String imageKey, int pay3, int pay4, int pay5) {
        List<PayoutDTO> list = List.of(new PayoutDTO(3, pay3), new PayoutDTO(4, pay4), new PayoutDTO(5, pay5));

        return new PaytableResponse(id, name, imageKey, list);
    }
}
