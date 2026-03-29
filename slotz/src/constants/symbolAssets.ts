import banana from "../assets/banana.png"
import lemon from "../assets/lemon.png"
import grape from "../assets/grape.png"
import watermelon from "../assets/watermelon.png"
import cherry from "../assets/cherry.png"
import strawberry from "../assets/strawberry.png"
import bell from "../assets/bell.png"

export const SYMBOL_ASSETS: Record<string, string> = {
    BANANA: banana,
    LEMON: lemon,
    GRAPE: grape,
    WATERMELON: watermelon,
    CHERRY: cherry,
    STRAWBERRY: strawberry,
    BELL: bell
}

export function getSymbolAsset(symbol: string): string | undefined {
    return SYMBOL_ASSETS[symbol];
}