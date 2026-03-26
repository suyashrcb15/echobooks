import { TextSegment } from '@/types'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { DEFAULT_VOICE, voiceOptions } from './constants'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

// Serialize Mongoose documents to plain JSON objects
export const serializeData = <T>(data: T): T =>
    JSON.parse(JSON.stringify(data))

// Auto generate slug
export function generateSlug(text: string): string {
    return text
        .replace(/\.[^/.]+$/, '')
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_]+/g, '-')
        .replace(/^-+|-+$/g, '')
}

// Escape regex special characters
export const escapeRegex = (str: string): string => {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

// Split text into segments
export const splitIntoSegments = (
    text: string,
    segmentSize: number = 500,
    overlapSize: number = 50
): TextSegment[] => {
    if (segmentSize <= 0) {
        throw new Error('segmentSize must be greater than 0')
    }

    if (overlapSize < 0 || overlapSize >= segmentSize) {
        throw new Error('overlapSize must be >= 0 and < segmentSize')
    }

    const words = text.split(/\s+/).filter((word) => word.length > 0)

    const segments: TextSegment[] = []

    let segmentIndex = 0
    let startIndex = 0

    while (startIndex < words.length) {
        const endIndex = Math.min(startIndex + segmentSize, words.length)

        const segmentWords = words.slice(startIndex, endIndex)

        const segmentText = segmentWords.join(' ')

        segments.push({
            text: segmentText,
            segmentIndex,
            wordCount: segmentWords.length
        })

        segmentIndex++

        if (endIndex >= words.length) break

        startIndex = endIndex - overlapSize
    }

    return segments
}

// Get voice by persona
export const getVoice = (persona?: string) => {
    if (!persona) return voiceOptions[DEFAULT_VOICE]

    const voiceEntry = Object.values(voiceOptions).find(
        (v) => v.id === persona
    )

    if (voiceEntry) return voiceEntry

    const voiceByKey = voiceOptions[persona as keyof typeof voiceOptions]

    if (voiceByKey) return voiceByKey

    return voiceOptions[DEFAULT_VOICE]
}

// Format seconds to MM:SS
export const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)

    const secs = seconds % 60

    return `${mins}:${secs.toString().padStart(2, '0')}`
}

// ----------------------
// PDF.JS CDN LOADER
// Bypasses webpack entirely — no import() of pdfjs-dist
// ----------------------

const PDFJS_VERSION = '3.11.174'
const PDFJS_CDN = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS_VERSION}`

function loadScript(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
            resolve()
            return
        }
        const script = document.createElement('script')
        script.src = src
        script.onload = () => resolve()
        script.onerror = () => reject(new Error(`Failed to load script: ${src}`))
        document.head.appendChild(script)
    })
}

async function getPdfjsLib(): Promise<any> {
    await loadScript(`${PDFJS_CDN}/pdf.min.js`)

    const pdfjsLib = (window as any)['pdfjs-dist/build/pdf']

    if (!pdfjsLib) {
        throw new Error('PDF.js failed to load from CDN')
    }

    pdfjsLib.GlobalWorkerOptions.workerSrc = `${PDFJS_CDN}/pdf.worker.min.js`

    return pdfjsLib
}

// ----------------------
// PDF PARSER
// ----------------------

export async function parsePDFFile(file: File) {
    try {
        const pdfjsLib = await getPdfjsLib()

        const arrayBuffer = await file.arrayBuffer()

        const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer })

        const pdfDocument = await loadingTask.promise

        // ---------- Cover ----------
        const firstPage = await pdfDocument.getPage(1)

        const viewport = firstPage.getViewport({ scale: 2 })

        const canvas = document.createElement('canvas')

        canvas.width = viewport.width
        canvas.height = viewport.height

        const context = canvas.getContext('2d')

        if (!context) throw new Error('Canvas context not available')

        await firstPage.render({ canvasContext: context, viewport }).promise

        const coverDataURL = canvas.toDataURL('image/png')

        // ---------- Extract Text ----------
        let fullText = ''

        for (let pageNum = 1; pageNum <= pdfDocument.numPages; pageNum++) {
            const page = await pdfDocument.getPage(pageNum)

            const textContent = await page.getTextContent()

            const pageText = textContent.items
                .map((item: any) => item.str || '')
                .join(' ')

            fullText += pageText + '\n'
        }

        const segments = splitIntoSegments(fullText)

        await pdfDocument.destroy()

        return {
            content: segments,
            cover: coverDataURL
        }

    } catch (error) {
        console.error('Error parsing PDF:', error)

        throw new Error(
            `Failed to parse PDF file: ${
                error instanceof Error ? error.message : String(error)
            }`
        )
    }
}