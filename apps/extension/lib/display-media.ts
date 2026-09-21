interface TabCaptureConstraints extends MediaTrackConstraints {
  mandatory?: {
    chromeMediaSource: "tab"
    chromeMediaSourceId: string
  }
}

export const requestTabCaptureStream = async (
  tabId: number
): Promise<MediaStream> => {
  if (import.meta.env.FIREFOX) {
    return navigator.mediaDevices.getDisplayMedia({
      audio: false,
      video: true,
    })
  }

  const streamId = await chrome.tabCapture.getMediaStreamId({
    targetTabId: tabId,
  })

  const stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      mandatory: {
        chromeMediaSource: "tab",
        chromeMediaSourceId: streamId,
      },
    } as TabCaptureConstraints,
  })

  return stream
}
