import type { IChartApi, ISeriesApi, UTCTimestamp } from "lightweight-charts";
import {
	CandlestickSeries,
	ColorType,
	createChart,
	HistogramSeries,
} from "lightweight-charts";
import { useEffect, useRef } from "react";
import type { Candle } from "@/types";

// Sample data for initial rendering
const SAMPLE_CANDLES: Candle[] = generateSampleCandles();

function generateSampleCandles(): Candle[] {
	const candles: Candle[] = [];
	let price = 0.1;
	const now = Math.floor(Date.now() / 1000);
	const interval = 3600; // 1h candles

	for (let i = 200; i >= 0; i--) {
		const time = now - i * interval;
		const open = price;
		const change = (Math.random() - 0.48) * 0.01;
		const close = price + change;
		const high = Math.max(open, close) + Math.random() * 0.005;
		const low = Math.min(open, close) - Math.random() * 0.005;
		const volume = Math.floor(Math.random() * 20000 + 1000);

		candles.push({ time, open, high, low, close, volume });
		price = close;
	}
	return candles;
}

interface CandlestickChartProps {
	candles?: Candle[];
}

export default function CandlestickChart({
	candles = SAMPLE_CANDLES,
}: CandlestickChartProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const chartRef = useRef<IChartApi | null>(null);
	const candleSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
	const volumeSeriesRef = useRef<ISeriesApi<"Histogram"> | null>(null);

	useEffect(() => {
		if (!containerRef.current) return;

		const chart = createChart(containerRef.current, {
			layout: {
				background: { type: ColorType.Solid, color: "#1a1a2e" },
				textColor: "#8888a0",
				fontFamily: "system-ui, sans-serif",
			},
			grid: {
				vertLines: { color: "#2a2a3e" },
				horzLines: { color: "#2a2a3e" },
			},
			crosshair: {
				vertLine: { color: "#646cff", width: 1, style: 2 },
				horzLine: { color: "#646cff", width: 1, style: 2 },
			},
			rightPriceScale: {
				borderColor: "#2a2a3e",
			},
			timeScale: {
				borderColor: "#2a2a3e",
				timeVisible: true,
				secondsVisible: false,
			},
			width: containerRef.current.clientWidth,
			height: containerRef.current.clientHeight,
		});

		const candleSeries = chart.addSeries(CandlestickSeries, {
			upColor: "#26a69a",
			downColor: "#ef5350",
			borderDownColor: "#ef5350",
			borderUpColor: "#26a69a",
			wickDownColor: "#ef5350",
			wickUpColor: "#26a69a",
		});

		const volumeSeries = chart.addSeries(HistogramSeries, {
			priceFormat: { type: "volume" },
			priceScaleId: "volume",
		});

		chart.priceScale("volume").applyOptions({
			scaleMargins: { top: 0.8, bottom: 0 },
		});

		chartRef.current = chart;
		candleSeriesRef.current = candleSeries;
		volumeSeriesRef.current = volumeSeries;

		// ResizeObserver for responsive chart
		const resizeObserver = new ResizeObserver((entries) => {
			for (const entry of entries) {
				const { width, height } = entry.contentRect;
				chart.applyOptions({ width, height });
			}
		});
		resizeObserver.observe(containerRef.current);

		return () => {
			resizeObserver.disconnect();
			chart.remove();
			chartRef.current = null;
			candleSeriesRef.current = null;
			volumeSeriesRef.current = null;
		};
	}, []);

	useEffect(() => {
		if (!candleSeriesRef.current || !volumeSeriesRef.current) return;

		const candleData = candles.map((c) => ({
			time: c.time as UTCTimestamp,
			open: c.open,
			high: c.high,
			low: c.low,
			close: c.close,
		}));

		const volumeData = candles.map((c) => ({
			time: c.time as UTCTimestamp,
			value: c.volume,
			color: c.close >= c.open ? "#26a69a40" : "#ef535040",
		}));

		candleSeriesRef.current.setData(candleData);
		volumeSeriesRef.current.setData(volumeData);
	}, [candles]);

	return <div ref={containerRef} className="w-full h-full min-h-75" />;
}
