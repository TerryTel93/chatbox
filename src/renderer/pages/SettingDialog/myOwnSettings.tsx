import { Typography, Box } from '@mui/material'
import { ModelSettings } from '../../../shared/types'
import { useTranslation } from 'react-i18next'
import { Accordion, AccordionSummary, AccordionDetails } from '../../components/Accordion'
import TemperatureSlider from '../../components/TemperatureSlider'
import TopPSlider from '../../components/TopPSlider'
import PasswordTextField from '../../components/PasswordTextField'
import MaxContextMessageCountSlider from '../../components/MaxContextMessageCountSlider'
import OpenAIModelSelect from '../../components/OpenAIModelSelect'
import TextFieldReset from '@/components/TextFieldReset'

interface ModelConfigProps {
    settingsEdit: ModelSettings
    setSettingsEdit: (settings: ModelSettings) => void
}

export default function myOwnSetting(props: ModelConfigProps) {
    const { settingsEdit, setSettingsEdit } = props
    const { t } = useTranslation()
    return (
        <Box>
            <PasswordTextField
                label={t('api key')}
                value={settingsEdit.myOwnKey}
                setValue={(value) => {
                    setSettingsEdit({ ...settingsEdit, myOwnKey: value })
                }}
                placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxx"
            />
            <>
                <TextFieldReset
                    margin="dense"
                    label={t('api host')}
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={settingsEdit.myOwnApiHost}
                    placeholder="https://www.example.com"
                    defaultValue='https://www.example.com'
                    onValueChange={(value) => {
                        value = value.trim()
                        if (value.length > 4 && !value.startsWith('http')) {
                            value = 'https://' + value
                        }
                        setSettingsEdit({ ...settingsEdit, myOwnApiHost: value })
                    }}
                />
            </>
            {/* <Accordion>
                <AccordionSummary aria-controls="panel1a-content">
                    <Typography>
                        {t('model')} & {t('token')}{' '}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <OpenAIModelSelect
                        model={settingsEdit.model}
                        openaiCustomModel={settingsEdit.openaiCustomModel}
                        onChange={(model, openaiCustomModel) =>
                            setSettingsEdit({ ...settingsEdit, model, openaiCustomModel })
                        }
                    />

                    <TemperatureSlider
                        value={settingsEdit.temperature}
                        onChange={(value) => setSettingsEdit({ ...settingsEdit, temperature: value })}
                    />
                    <TopPSlider
                        topP={settingsEdit.topP}
                        setTopP={(v) => setSettingsEdit({ ...settingsEdit, topP: v })}
                    />
                    <MaxContextMessageCountSlider
                        value={settingsEdit.openaiMaxContextMessageCount}
                        onChange={(v) => setSettingsEdit({ ...settingsEdit, openaiMaxContextMessageCount: v })}
                    />
                </AccordionDetails>
            </Accordion> */}
        </Box>
    )
}
