import sys
from youtube_transcript_api import YouTubeTranscriptApi

def main():
    if len(sys.argv) < 2:
        print("Error: Please provide a video ID as an argument.")
        sys.exit(1)

    video_id = sys.argv[1]

    try:
        transcript = YouTubeTranscriptApi.get_transcript(video_id)
        print(transcript)

        for item in transcript:
            print(item)
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
